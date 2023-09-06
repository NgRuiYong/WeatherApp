This is a [Next.js](https://nextjs.org/) 
## Getting Started

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Assumption made
- The current UI design of the test is intended, there is no theme required.
- The search result expects only 1 result or none.
- Clearing the form does not clear the results.
- During the search, you can't clear the form
- Assuming the first item of the weather array is the most accurate and we will always take the first item of the weather array and ignore the rest of the items.
- Minimum supported resolution would be iPhone 5 SE