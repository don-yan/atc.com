// Load environment variables from .env file
require('dotenv').config();

const mailchimp = require('@mailchimp/mailchimp_marketing');
const fs = require('fs');

// Load values from environment variables
const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
const dataCenter = process.env.MAILCHIMP_DATA_CENTER; // e.g., 'us19'

// Configure the Mailchimp API
mailchimp.setConfig({
  apiKey: apiKey,
  server: dataCenter,
});


/**
 * Fetch all members from MailChimp
 * @return {Promise<*[]>}
 */
async function fetchAllMembers() {
  let allMembers = [];
  let offset = 0;
  const count = 1000; // Maximum per request

  try {
    while (true) {
      const response = await mailchimp.lists.getListMembersInfo(audienceId, {
        offset: offset,
        count: count
      });

      allMembers = [...allMembers, ...response.members];

      // If there are no more members, stop the loop
      if (response.members.length < count) {
        break;
      }

      // Update the offset for the next request
      offset += count;
    }
    return allMembers;
  } catch (error) {
    console.error('Error fetching members:', error.response ? error.response.body : error.message);
    throw error;
  }
}

/**
 * Export audience & save to CSV
 * @return {Promise<void>}
 */
 async function exportAudience() {
  try {
    const allMembers = await fetchAllMembers();

     // Save the audience list to a CSV file
    const csvHeaders = 'email_address,status,merge_fields.first_name,merge_fields.last_name\n';
    const csvData = allMembers
      .map(member => `${member.email_address},${member.status},${member.merge_fields.FNAME || ''},${member.merge_fields.LNAME || ''}`)
      .join('\n');

    console.log(csvData);

    fs.writeFileSync('exported_audience.csv', csvHeaders + csvData);
    console.log('Processed last names exported successfully!');
  } catch (error) {
    console.error('Error exporting audience list:', error.message);
  }
}


const api = {
  fetchAllMembers
}

// export default api;

 module.exports = api;

// exportAudience();
