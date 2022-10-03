/**
 * We store all the headings as a key value pairs in a hashTable for fast retrievel
 * @complexities Time => O(n)
 */
const headingHashTable = {
  "#": ["<h1>", "</h1>"],
  "##": ["<h2>", "</h2>"],
  "###": ["<h3>", "</h3>"],
  "####": ["<h4>", "</h4>"],
  "#####": ["<h5>", "</h5>"],
  "######": ["<h6>", "</h6>"],
}

const test = () => {
  return 1
}

/**
 * Converts the Mark Down to HTML
 *
 * @return {void}
 */
const makeHtml = () => {
  // Fetch the mark down contents using the dom getElementById
  let input = document.getElementById("markDownContents").value
  const html = recursiveParser(input, "")
  // Append the output
  document.getElementById("htmlContents").innerHTML = html
}

/**
 * Check if the string is a heading
 *
 * @param {string} string
 * @return {boolean}
 * @complexites Time => O(1), We are checking if the first word is in our headingHashTable. Look ups in hashTable are always a constant operation
 */
const isHeading = (string) => {
  if (string in headingHashTable) {
    return true
  } else {
    return false
  }
}

/**
 * Check if the string is a link
 *
 * @param {string} mdContents
 * @return {boolean}
 */
const isLink = (mdContents) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
  const matches = mdContents.match(regexMdLinks)
  if (!matches) {
    return false
  }
  return true
}

/**
 * Build Link
 *
 * @param {string} mdContents
 * @return {string}
 */
const buildLink = (mdContents) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
  const matches = mdContents.match(regexMdLinks)
  const singleMatch = /\[([^\[]+)\]\((.*)\)/
  const data = singleMatch.exec(matches[0])
  const text = data[1]
  const link = data[2]
  return "<a href=" + '"' + link + '"' + ">" + text + "</a>"
}

/**
 * Build Heading
 *
 * @param {array} line
 * @return {string}
 */
const buildHeading = (line) => {
  let headingStart = headingHashTable[line[0]][0]
  let headingEnd = headingHashTable[line[0]][1]
  let headingContent = ""
  for (let idx = 1; idx < line.length; idx++) {
    const link = isLink(line[idx])
    if (link) {
      headingContent += buildLink(line[idx]) + " "
    } else {
      headingContent += line[idx] + " "
    }
  }

  return headingStart + headingContent.trim() + headingEnd + "\n"
}

/**
 * Build Paragraph
 *
 * @param {array} line
 * @return {string}
 */
const buildParagraph = (line) => {
  let paragraphStart = "<p>"
  let paragraphEnd = "</p>"
  let paragraph = ""
  for (let idx = 0; idx < line.length; idx++) {
    const link = isLink(line[idx])
    if (link) {
      paragraph += buildLink(line[idx]) + " "
    } else {
      paragraph += line[idx] + " "
    }
  }

  return paragraphStart + paragraph.trim() + paragraphEnd + "\n"
}

/**
 * Clears the two textareas
 *
 * @return {void}
 */
const clearTextArea = () => {
  document.getElementById("markDownContents").value = ""
  document.getElementById("htmlContents").value = ""
}

/**
 * Load the html to display preview
 *
 * @return {void}
 */
const preview = () => {
  $("#dialog").html($("#htmlContents").val())
  $("#dialog").dialog("open")
}

/**
 * Recursive function to parse the input
 *
 * @param {string} input
 * @param {html} html
 *
 * @return {html}
 */
const recursiveParser = (input, html) => {
  // Base Case - If the input length is 0 or less
  input = input.trim()
  if (input.length <= 0) {
    return html
  }

  // If it contains atleast one new line
  if (input.includes("\n")) {
    let data = input.split("\n")
    let words = data[0].split(" ")
    const heading = isHeading(words[0])
    if (heading) {
      const headingIdx = getSubStringIdxOfHeading(input)
      const [startIdx, endIdx] = headingIdx
      let line = input.slice(0, endIdx)
      // Split the string by space excluding the space within the square brackets
      line = line.split(/ (?![^[]*\])/)
      html += buildHeading(line)
      // New input after slicing the heading
      let newInput = input.slice(startIdx, input.length)
      return recursiveParser(newInput, html)
    } else {
      const paragraphIdx = getSubStringIdxOfParagraph(input)
      let line = input.slice(0, paragraphIdx)
      // Replace all the new lines with space
      line = line.replace(/\n/g, " ")
      // Split the string by space excluding the space within the square brackets
      line = line.split(/ (?![^[]*\])/)
      html += buildParagraph(line)
      // New input after slicing the paragraph
      let newInput = input.slice(paragraphIdx + 1, input.length)
      return recursiveParser(newInput, html)
    }
  }
  // input is just a single line without any new lines
  else {
    // Split by space excluding the space within the square brackets
    let words = input.split(/ (?![^[]*\])/)
    let firstWord = words[0]
    const heading = isHeading(firstWord)
    if (heading) {
      html += buildHeading(words)
      return recursiveParser("", html)
    } else {
      html += buildParagraph(words)
      return recursiveParser("", html)
    }
  }
}

/**
 * Get the end and start of the new heading idx
 *
 * @param {string} string
 * @return {array}
 */
const getSubStringIdxOfHeading = (string) => {
  const stringLength = string.length
  let idx = 0
  let startIdx = 0
  let character = string[idx]
  while (character !== "\n" && idx < stringLength) {
    idx++
    character = string[idx]
  }

  startIdx = idx

  while (character === "\n" && idx < stringLength) {
    idx++
    character = string[idx]
  }

  return [idx, startIdx]
}

/**
 * Get the end of the paragraph sub string idx ending with atleast 2 consecutive new lines
 *
 * @param {string} string
 * @return {integer}
 */
const getSubStringIdxOfParagraph = (string) => {
  const stringLength = string.length
  let count = 0
  for (let idx = 0; idx < stringLength; idx++) {
    let character = string[idx]
    if (character === "\n") {
      count++
      if (count === 2) {
        return idx
      }
    } else {
      count = 0
    }
  }
  return stringLength
}

module.exports = recursiveParser
