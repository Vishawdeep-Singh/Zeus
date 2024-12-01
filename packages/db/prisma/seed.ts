import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
    { id: 21, name: "Alex Johnson", email: "alex.johnson@example.com", cellPh: "1991316536", provider: "credentials" },
    { id: 22, name: "Taylor Smith", email: "taylor.smith@example.com", cellPh: "7748162102", provider: "credentials" },
    { id: 23, name: "Jordan Lee", email: "jordan.lee@example.com", cellPh: "5359753623", provider: "credentials" },
    { id: 24, name: "Morgan Brown", email: "morgan.brown@example.com", cellPh: "2934748924", provider: "credentials" },
    { id: 25, name: "Casey Davis", email: "casey.davis@example.com", cellPh: "8291458782", provider: "credentials" },
    { id: 26, name: "Riley Wilson", email: "riley.wilson@example.com", cellPh: "3294626873", provider: "credentials" },
    { id: 27, name: "Jamie Martinez", email: "jamie.martinez@example.com", cellPh: "9952476389", provider: "credentials" },
    { id: 28, name: "Avery White", email: "avery.white@example.com", cellPh: "3538832370", provider: "credentials" },
    { id: 29, name: "Parker Young", email: "parker.young@example.com", cellPh: "9327907618", provider: "credentials" },
    { id: 30, name: "Quinn Harris", email: "quinn.harris@example.com", cellPh: "8984341011", provider: "credentials" },
    { id: 31, name: "Dylan Carter", email: "dylan.carter@example.com", cellPh: "9347384935", provider: "credentials" },
    { id: 32, name: "Harper Evans", email: "harper.evans@example.com", cellPh: "8137807423", provider: "credentials" },
    { id: 33, name: "Charlie Morgan", email: "charlie.morgan@example.com", cellPh: "8675853709", provider: "credentials" },
    { id: 34, name: "Reese Bennett", email: "reese.bennett@example.com", cellPh: "9428034347", provider: "credentials" },
    { id: 35, name: "Dakota Sanders", email: "dakota.sanders@example.com", cellPh: "4377352212", provider: "credentials" },
    { id: 36, name: "Skyler Peterson", email: "skyler.peterson@example.com", cellPh: "9601011060", provider: "credentials" },
    { id: 37, name: "Rowan Cooper", email: "rowan.cooper@example.com", cellPh: "9782616308", provider: "credentials" },
    { id: 38, name: "Spencer Reed", email: "spencer.reed@example.com", cellPh: "9848577013", provider: "credentials" },
    { id: 39, name: "Logan Scott", email: "logan.scott@example.com", cellPh: "9919303765", provider: "credentials" },
    { id: 40, name: "Phoenix Brooks", email: "phoenix.brooks@example.com", cellPh: "6024481756", provider: "credentials" },
    { id: 41, name: "Sawyer Adams", email: "sawyer.adams@example.com", cellPh: "7649257444", provider: "credentials" },
    { id: 42, name: "Emerson Clark", email: "emerson.clark@example.com", cellPh: "8732604805", provider: "credentials" },
    { id: 43, name: "River Foster", email: "river.foster@example.com", cellPh: "9009721680", provider: "credentials" },
    { id: 44, name: "Sage Mitchell", email: "sage.mitchell@example.com", cellPh: "5005026559", provider: "credentials" },
    { id: 45, name: "Blake Turner", email: "blake.turner@example.com", cellPh: "4543315588", provider: "credentials" },
    { id: 46, name: "Cameron Hughes", email: "cameron.hughes@example.com", cellPh: "8446046989", provider: "credentials" },
    { id: 47, name: "Elliot Bailey", email: "elliot.bailey@example.com", cellPh: "3353022540", provider: "credentials" },
    { id: 48, name: "Finley King", email: "finley.king@example.com", cellPh: "6038222678", provider: "credentials" },
    { id: 49, name: "Jordan Hill", email: "jordan.hill@example.com", cellPh: "2376163855", provider: "credentials" },
    { id: 50, name: "Taylor Ward", email: "taylor.ward@example.com", cellPh: "5683481432", provider: "credentials" },
  ];

async function main() {
  console.log("Seeding database...");

  for (let i = 0 ; i < 29 ; i++) {
    if (!users.at(i)) {
        console.log(`User at index ${i} is undefined.`);
        continue; 
      }
   
        const response = await prisma.attendance.create({
            data: {
              userId: Number(users.at(i)?.id),
              gymId: "92127ffb-1206-4470-a2e6-1f56eafbd791",
              date: "11/26/2024",
              time: "10:55:42 AM",
            },
          });
     
      
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })

