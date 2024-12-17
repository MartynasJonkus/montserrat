# Project Setup Instructions

## Installations
- Visual Studio Code
- Node.js
- .NET SDK 8.0

## Running the React Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the ASP.NET API

1. Navigate to the API directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   dotnet restore
   ```
3. Start the server:
   ```bash
   dotnet run
   ```
4. (Optional) Inspect the API with Swagger:
   ```bash
   dotnet watch run
   ```
   
## Database setup

1. Insert dbsettings.json in to the montserrat/api/ directory:
   ```bash
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=host; Port=port; Database=database; Username=username; Password=password"
     }
   }
   ```
2. Replace with specific database details

## VS code extensions  
- c#
- c# dev kit
- .net expansion pack
- .net install tool
- prettier
- extension pack by joskreativ
- es7
