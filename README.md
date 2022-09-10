# Table Component API

### 💡 Overview

Table component that is built with reusability and modularity in mind.
Developers should be able to able to plug and play data in with relative ease.

note: API call may be too fast to see the loading state, so I've added a `setTimeout()`

### ✅ To-Do List

##### Expectations:

- [x] Table should have 4 or more columns.
      <br>
- [x] Table data state
      <br>
- [x] Asynchronously fetching data can be faked (setTimeout, Promise, …)
- [x] Display in-flight state while fetching data
      <br>

- [x] Table should have pagination (ex. 100 records, 25 records per page)
- [x] Next / Previous buttons
      <br>

- [x] Show current page number
- [x] Table should have filtering
- [x] At least one column should be sortable
      <br>
- [x] Add a search bar above table to filter by one data property
- [x] Table rows should be selectable
- [x] Create a checkbox for each row
- [x] Display selected rows as JSON below Table component
- [x] No class components. Use hooks.

### 🛠 Props

##### title

Type: `String`
Default: `null`
Display table title on top of table

##### resource

Type: `Array`
Array of resource object to be displayed in the table

##### minLoadingItems

Type: `Number`
Default: 8
Minimum skeleton items to show while data is loading (to prevent empty table when loading)

##### isLoading

Type: `Boolean`
Default: `false`
Loading state to trigger conditionals (used to trigger skeleton loading effect as we wait for a response from API)

##### headers

Type: `Array`
Array of objects to define the headers on the table, the headers will determine which column of `resource` to populate

##### count

Type: `Number`
Number of items in the resource (used to display total records)

##### limitPerPage

Type: `Number`
Limit items per page

##### prevPage

Event function to trigger previous page API call

##### nextPage

Event function to trigger next page API call
