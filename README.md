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
- Search history is only temporary storage, no need to store locally and won't be used extensively, therefore no need for optimization e.g. virtual list / pagination / infinite scroll
- Forms fields are complusory
- Search history are based off the information that they typed in the input field, not the results 
- Searching via search history will create another row in search history 
- Users that uses this app knows what is country code.
- The time shown in the app will be in the user's timezone.
- If user inputs invalid city or country name, show appropriate message on UI means if the api does not return any results