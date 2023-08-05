const fakeCompanies = [
  {
    name: "Company B",
    numberOfEmployees: 739,
    rating: 3,
    email: "contact1@example.com",
    phoneNumber: 15551239210,
    altitude: "49.187731",
    longitude: "-94.208630",
    description: "A global consulting firm providing strategic business solutions."
  },
  {
    name: "Company F",
    numberOfEmployees: 282,
    rating: 5,
    email: "contact2@example.com",
    phoneNumber: 15551237529,
    altitude: "6.153693",
    longitude: "-124.104586",
    description: "A well-known media production company producing award-winning content."
  },
  // ... (previous objects)

  {
    name: "Company K",
    numberOfEmployees: 137,
    rating: 4,
    email: "contact11@example.com",
    phoneNumber: 15551231845,
    altitude: "51.5074",
    longitude: "-0.1278",
    description: "A fashion company offering trendy apparel and accessories."
  },
  {
    name: "Company R",
    numberOfEmployees: 502,
    rating: 4,
    email: "contact12@example.com",
    phoneNumber: 15551231324,
    altitude: "40.7128",
    longitude: "-74.0060",
    description: "A marketing agency delivering innovative campaigns."
  },
  {
    name: "Company T",
    numberOfEmployees: 183,
    rating: 3,
    email: "contact13@example.com",
    phoneNumber: 15551237580,
    altitude: "34.0522",
    longitude: "-118.2437",
    description: "A travel company specializing in adventure trips."
  },
  {
    name: "Company X",
    numberOfEmployees: 678,
    rating: 5,
    email: "contact14@example.com",
    phoneNumber: 15551235689,
    altitude: "35.6895",
    longitude: "139.6917",
    description: "An electronics company producing cutting-edge gadgets."
  },
  {
    name: "Company Z",
    numberOfEmployees: 91,
    rating: 4,
    email: "contact15@example.com",
    phoneNumber: 15551238876,
    altitude: "37.7749",
    longitude: "-122.4194",
    description: "A startup offering innovative tech solutions."
  }
];


module.exports=fakeCompanies;
const sleep=(ms=2000)=>new Promise((r)=>setTimeout(r,ms));