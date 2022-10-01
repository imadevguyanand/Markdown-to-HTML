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

/**
 * Converts the Mark Down to HTML
 *
 * @return {html}
 */
const makeHtml = () => {
  // Fetch the mark down contents using the dom getElementById
  let input = document.getElementById("markDownContents").value
  let html = ""

  if (!input) {
    return html
  }

  let lines = []
  if (input.includes("\n")) {
    lines = input.split("\n")
  } else {
    lines.push(input)
  }

  // Loop through every line
  for (let line of lines) {
    if (line) {
      // Split the line by space but excluding the space within the square bracket
      let words = line.split(/ (?![^[]*\])/)
      // Check if the first word is a heading
      const heading = isHeading(words[0])
      if (heading) {
        // Build the heading
        html += buildHeading(words)
      } else {
        // Build the paragraph
        html += buildParagraph(words)
      }
    }
  }
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
