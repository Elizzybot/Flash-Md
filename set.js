const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlA5bjJvUnc4REltTUo5VUNCenIxTmM1RE9yVUExSUJKUVpXUjR4N1lVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzVkVThJNGxUT3A4Skk5YStYNEc2Z3Q4Z1N5bmVualVxenBQeVBHc3hGWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSWZONDVteWtEWnJZUmJmQVJ0dW04cGYwdThyT3FCZnhGRVk3aUxyMmxrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrWklJUlMrUWlVU0FGK3FGL0JrSkwxV2NRRUlsTzc2YlphMXR2eGx4YjNnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFDc1RRSXhGb21LRVFLWDV6UHFPVFJrSURKc29vOGx6N0xVRml4QlZtRmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktZQ01rZGZyZnN3VGZCNjVoRE5yVk42ancwY0JzRjBwYXRPaVFFZEQzUzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0pleDlEbjJKeVdzODFrNzFQVEZvcXRwYVdYS0s3U1diVnZCMzRlc00yST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT3pMckxpQW80T01kOVEwOVNSOXM4QjBzeHAyd3ZsWkxpNTZnS2cvWi9Baz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNVQjhuT1ZoK0J2Smk2a3NIbitTZEgvTVltN3JpTGp6U3lldHRKMGdnM3lNTXlpdHRoM3IwMnZmMWxRZUZmSzhabnNtWGRCUjVDVXp0bjRpZGVtbWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6IlVaSUw3Q1FhRVdqVDJBK1d1Wm5Xc05GYk5sc2szQ3FHRXNWU3NYOHNXdFE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik9SVWQxZWVZUjV1RkdvYl9YT0h4NlEiLCJwaG9uZUlkIjoiOGJjNjFhZTktYzBmYy00Zjk5LThiYTctMjU1NjFiNDFhZjRiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQMGNodDYwTGlmUXlPZ0dDVGJRTGJnazRBdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXS0dCOWgxSGlCbzVRQlRsaHg5aWU0Vlh3Skk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUVg2NFdXWjciLCJtZSI6eyJpZCI6IjIzNDcwMzg0OTQ5OTc6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJHUkVZLUhFQVJULVRFQ0gifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kzNGl0SUdFTWVkN2JZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjJSQUtjQUp0WFk5M2VmdnZVR0NFZ3hFbXVmNTdEeFJFU20zTGU0YUY0M1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im9IakF1b3JTSmFnVndCbzVub2dRVWthRXVibjVBa1RRMVI4cmJDU3h5clBMamVibjk2aE00TC9aV3VLQzNPdis5YURaUXBUaW9SUGlqaUVJVmt2YURnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvTnphRnQ2ZVZDTmQxRTFnbWYxckpnY3lwbjlTaDFBNnhEazh1cHNhM2pTaC91cXZtbVdoUzJBRWtlY3RVMW04Y3pVbW1XbStzZGJNVFdhS05oQ25pdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMzg0OTQ5OTc6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJka1FDbkFDYlYyUGQzbjc3MUJnaElNUkpybitldzhVUkVwdHkzdUdoZU4yIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NjQ4NTk2fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "GREY-HEART-TECH",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2347038494997", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'GTEY-HEART-TECH',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

