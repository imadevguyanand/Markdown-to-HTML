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

## Test Cases - Jest Framework

The application has few test cases and it uses the Jest framework

1. Run the below command to execute the test cases

   ```
   npm run test
   ```

![Test Cases Screenshot!](https://drive.google.com/uc?export=view&id=12Jea0ClXmdiJr8wdrnCFLVNRIbl9sMdG)

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
