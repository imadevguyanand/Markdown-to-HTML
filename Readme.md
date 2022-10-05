# Markdown to HTML Conversion

## TechStack and Software Packages

- Language: Javascript, Jquery, HTML, Bootstrap
- Deployement Infrastructure: Heroku Cloud
- Testing Framework: Jest

</br>

## Application Hosted

The application is hosted on heroku server and the link to the application is [here](https://markdown-to-html-conversion.herokuapp.com/)

![Application Screenshot!](https://drive.google.com/uc?export=view&id=17FmCL7h4UiWJj-YtWff6BphatjCCR_Np)

</br>

## [Reference Site](https://markdowntohtml.com/)

I have refered the above site to build this converter. Although I have tried to replicate the functionalities, there are few edge cases which fails to work due to the time constraint

## Thought Process

1. I went to the reference site to see the results for few edge cases to handle them in our converter
2. Wrote logics to identify the below tags and build html string by cancatinating

   - **Headings** - If the input starts with the following #, ##, ###, ####, #####, ######

   - **Paragraph** - If the input is not starting with a heading tag

   - **Links** - Used regex to identify the links

   - **Build Heading** - Construct the heading with space separated

   - **Build Paragraph** - Construct the paragraph with space separated

   - **Build Links** - Construct the links using regex

## Test Cases - Jest Framework

The application has few test cases and it uses the Jest framework

1. Run the below command to execute the test cases

   ```
   npm run test
   ```

![Test Cases Screenshot!](https://drive.google.com/uc?export=view&id=12Jea0ClXmdiJr8wdrnCFLVNRIbl9sMdG)

## Challenges Faced

1. Handling the edge cases
2. Understanding Regex and its syntax

## Markdown to html conversion plugin for few specifications. Below are the specifications

| Markdown                               | HTML                                              |
| -------------------------------------- | ------------------------------------------------- |
| `# Heading 1`                          | `<h1>Heading 1</h1>`                              |
| `## Heading 2`                         | `<h2>Heading 2</h2>`                              |
| `...`                                  | `...`                                             |
| `###### Heading 6`                     | `<h6>Heading 6</h6>`                              |
| `Unformatted text`                     | `<p>Unformatted text</p>`                         |
| `[Link text](https://www.example.com)` | `<a href="https://www.example.com">Link text</a>` |
| `Blank line`                           | `Ignored`                                         |
