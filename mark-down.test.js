const recursiveParser = require("./mark-down-to-html")

// Heading 1
test("# Heading 1 to equal <h1>Heading 1</h1>", () => {
  expect(recursiveParser("# Header 1", "")).toContain("<h1>Header 1</h1>")
})

// Heading 2
test("## Heading 2 to equal <h2>Heading 2</h2>", () => {
  expect(recursiveParser("## Header 2", "")).toContain("<h2>Header 2</h2>")
})

// Heading 3
test("### Heading 3 to equal <h3>Heading 3</h3>", () => {
  expect(recursiveParser("### Header 3", "")).toContain("<h3>Header 3</h3>")
})

// Heading 4
test("#### Heading 4 to equal <h4>Heading 4</h4>", () => {
  expect(recursiveParser("#### Header 4", "")).toContain("<h4>Header 4</h4>")
})

// Heading 5
test("##### Heading 5 to equal <h5>Heading 5</h5>", () => {
  expect(recursiveParser("##### Header 5", "")).toContain("<h5>Header 5</h5>")
})

// Heading 6
test("###### Heading 6 to equal <h6>Heading 6</h6>", () => {
  expect(recursiveParser("###### Header 6", "")).toContain("<h6>Header 6</h6>")
})

// Link
test("[text](link) link", () => {
  expect(recursiveParser("[Mailchimp](https://www.mailchimp.com)", "")).toContain('<a href="https://www.mailchimp.com">Mailchimp</a>')
})

// Header and Link
test("Header and link", () => {
  expect(recursiveParser("# Header 1 [Mailchimp](https://www.mailchimp.com)", "")).toContain('<h1>Header 1 <a href="https://www.mailchimp.com">Mailchimp</a></h1>')
})

// Header and Link and Header and Link
test("Header and link and Header and link", () => {
  expect(recursiveParser("# Header 1 [Mailchimp](https://www.mailchimp.com) # Header 1 [Mailchimp](https://www.mailchimp.com)", "")).toContain(
    '<h1>Header 1 <a href="https://www.mailchimp.com">Mailchimp</a> # Header 1 <a href="https://www.mailchimp.com">Mailchimp</a></h1>'
  )
})

// Paragraph
test("Paragraph", () => {
  expect(recursiveParser("This is a Paragraph", "")).toContain("<p>This is a Paragraph</p>")
})

// Paragraph and Link
test("Paragraph and link", () => {
  expect(recursiveParser("Paragraph [Mailchimp](https://www.mailchimp.com)", "")).toContain('<p>Paragraph <a href="https://www.mailchimp.com">Mailchimp</a></p>')
})

// Paragraph and Link and Paragraph and Link
test("Paragraph and link and Paragraph and Link", () => {
  expect(recursiveParser("Paragraph [Mailchimp](https://www.mailchimp.com) Paragraph [Mailchimp](https://www.mailchimp.com)", "")).toContain(
    '<p>Paragraph <a href="https://www.mailchimp.com">Mailchimp</a> Paragraph <a href="https://www.mailchimp.com">Mailchimp</a></p>'
  )
})

const testString1 = `# Sample Document
Hello!
This is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.`

const output1 = `<h1>Sample Document</h1>
<p>Hello! This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>`

// Header and Paragraph and Link
test("Paragraph and link and Paragraph and Link", () => {
  expect(recursiveParser(testString1, "")).toContain(output1)
})

const testString2 = `# Header one

Hello there

How are you?
What's going on?

## Another Header

This is a paragraph [with an inline link](http://google.com) Neat, eh?

## This is a header [with a link](http://yahoo.com)`

const output2 = `<h1>Header one</h1>
<p>Hello there</p>
<p>How are you? What's going on?</p>
<h2>Another Header</h2>
<p>This is a paragraph <a href="http://google.com">with an inline link</a> Neat, eh?</p>
<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`

// Header and Paragraph and Paragraph and Header and Paragraph and Header
test("Paragraph and link and Paragraph and Link", () => {
  expect(recursiveParser(testString2, "")).toContain(output2)
})
