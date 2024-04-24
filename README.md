# HR Tool

- [x] Make the navigator responsive (Done)
- [x] Add loading screens (Done) / For the main page
- [x] Finish the Title bar (Add signout feature) (Add home icon and user icon with the dropdown menu) (Done)
- [x] Remove zustand and add jotai (Done)
- [x] Rework jotai providers to work with server rendering
- [x] Create the table UI (Skeleton)
- [x] Refactor the atoms to minimize rerenders
- [x] Add validation when creating / updating data
- [x] Block save when there are any validation errors
- [x] Handle success / error states when duing the actual CRUD operations (revert data as needed)
- [x] Handle loading state when mutation is ongoing. (text fields / Toolbar should be disabled during the mutation)
- [ ] Change the column def so setValue, validationSchema are not required when the column is readonly
- [ ] Create cells for, text, number, date, enum, lov input types
  - [x] Text
  - [x] Number
  - [ ] Lov
  - [ ] Enum (Nullable | Not Nullable)
  - [ ] Date
  - [ ] Boolean (Nullable | Not Nullable)
  - [ ] Error message (Validation)
- [ ] Handle Required fields (Styling and checking when saving)
- [ ] Navigate when clicked on the link where applicable 
- [ ] Try to optimize re rendering in tables
- [ ] Create final table UI
- [ ] Create Alternate table UI/ the shadcn one will be the list view and the alternate on will be the table view (like in ifs)
- [ ] Handle table data loading (Loading skeleton for table / forms)
- [ ] Create the table UI for time reporting
- [ ] Configure the backend - (Drizzle, Database)
- [ ] Add pages to User, Company, Employee, Project, Activity, Customer entities
- [ ] Create Time Report Page
- [ ] Create Quick Report Page
- [ ] Add export table functions (Excel)
- [ ] Add export quick report fuction (Excel, Pdf)
- [ ] Add permission features,
- [ ] Add loading skeletons to, list pages, form pages etc if needed
- [ ] Add themeing support
