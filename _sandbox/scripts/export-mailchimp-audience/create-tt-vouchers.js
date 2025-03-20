require('dotenv').config();
const axios = require('axios');
const mailChimp = require('./export-audience')
const stringifySafe = require('json-stringify-safe');
const {writeFileSync} = require("fs");
// Load values from environment variables
const apiKey = process.env.TICKET_TAILOR_API_KEY; // Your Ticket Tailor API key


/**
 *
 * @return {Promise<void>}
 */
async function createVoucherCodesFromMailchimp() {
    try {
        const allMembers = await mailChimp.fetchAllMembers();

        // Process last names:
        let lastNames = allMembers
            .map(member => member.merge_fields.LNAME || '')  // Get the last names
            .filter(name => name !== '')                     // Remove any empty names

        // Remove duplicates, convert to lowercase, and replace spaces and apostrophes with dashes
        lastNames = lastNames.map(name => name.toLowerCase())    // Convert to lowercase
            .map(name => name.replace(/[\s'’]/g, '-')) // Replace spaces and apostrophes with dashes
            .map(name => toLatinEquivalent(name)) // normalize non-latin characters
            .sort()
            .map(name => 'code-' + name) // prefix with "code-"

        lastNames = [...new Set(lastNames)]  // Remove duplicates


        const voucherCodes = lastNames.join('\n');


        console.log('createVoucherCodesFromMailchimp | ', voucherCodes);

        console.log('\n\n===========\n\n\n\n')


        const csvHeaders = 'email_address,status,first_name,last_name,code\n';
        // const csvHeaders = 'code\n';
        writeFileSync('exported_audience.csv', csvHeaders + voucherCodes);
    } catch (error) {
        console.error('Error exporting audience list:', error.message);
    }
}


/**
 * Function to create a voucher with associated codes
 *
 * Ref: https://developers.tickettailor.com/?shell#create-a-voucher-and-its-voucher-codes
 * @return {Promise<void>}
 */
async function createVoucher(eventSeries, voucherCodes = ["testCode1", "testCode2"]) {


    try {

        const expiryDate = addTwoWeeksToTimestamp(eventSeries.next_occurrence_date.unix);

        const voucherData = {
            codes: ["testCode1", "testCode2"],         // Voucher codes to be created
            // event_series_ids: ["es_1", "es_2"],        // Associated event series IDs
            // expiry: expiryDate,                        // Voucher expiry as Unix timestamp
            interval: 12,
            name: "Test voucher with codes",           // Name of the voucher
            partial_redemption: "false",               // Whether the voucher can be partially redeemed
            voucher_type: "GIFT_CARD",                     // Type of voucher: "PROMO" for promo codes or "GIFT_CARD"
            value: 540                                  // Voucher value in cents (e.g., 540 cents = $5.40)
        };

        console.log('createVoucher', voucherData)


        const response = await axios.post('https://api.tickettailor.com/v1/vouchers',
            voucherData,
            {
                auth: {
                    username: apiKey,  // Your API key for authorization
                    password: '',      // No password required, just the API key for basic auth
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

        console.log('Voucher created successfully:', JSON.stringify(response.data, null, 1));
    } catch (error) {
        console.error('Error creating voucher:', error.response ? JSON.stringify(error.response.data, null, 1) : error.message);
    }
}

function addTwoWeeksToTimestamp(originalTimestamp) {
    // Define the number of seconds in 2 weeks
    const secondsInTwoWeeks = 2 * 7 * 24 * 60 * 60;

    // Calculate the new timestamp
    const newTimestamp = originalTimestamp + secondsInTwoWeeks;

    return newTimestamp;
}

/**
 * Get the latest event
 * @return {Promise<*>}
 */
async function getLatestEvent() {

    let result;
    let allEvents = await fetchEventSeries();

    console.log('allEvents.length', allEvents.length)
    if (allEvents.length > 0) {
        result = allEvents[allEvents.length - 1]
    }

    console.log(stringifySafe(result))
    return result;
}

/**
 * Function to list event series
 */
async function fetchEventSeries(params) {
    let allEvents = []

    try {
        const response = await axios.get('https://api.tickettailor.com/v1/event_series', {
            params,
            auth: {
                username: apiKey,  // API key for authorization
                password: '',      // No password required, just the API key for basic auth
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });


        allEvents = [...response.data.data]

    } catch (error) {
        console.error('Error fetching event series:', error.response ? error.response.data : error.message);
    }
    // console.log('returning',allEvents.length)
    return allEvents
}

/**
 * Convert non-latin characters to latin equivalent
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#form
 * @param str
 * @return {*}
 */
function toLatinEquivalent(str) {
    // Step 1: Normalize to decompose characters (e.g., "é" → "e" + combining acute accent)
    let normalized = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // NOTE: 'NFD' = Canonical Decomposition.


    // Step 2: Custom mapping for non-Latin characters not handled by normalization
    const charMap = {
        'æ': 'ae',
        'œ': 'oe',
        'ß': 'ss',
        'đ': 'd',
        'ł': 'l',
        'ø': 'o',
        'å': 'a',
        'ä': 'a',
        'ö': 'o',
        'ü': 'u',
        'ñ': 'n',
        'ç': 'c',
        'ć': 'c',
        'š': 's',
        'ž': 'z',
        'ý': 'y',
        'þ': 'th',
        'ð': 'd',
        'ı': 'i',
        // Add more mappings as needed
    };

    const regex = /[æœßđłøåäöüñçćšžýþðı]/g


    if (regex.test(str)) {
        // Step 3: Replace characters using the map
        console.log('toLatinEquivalent match!', str)
        return normalized.replace(regex, match => charMap[match] || match);
    }


    return str;
}

/**
 * MAIN Method
 */
async function main() {

    console.log('begin')

    // console.log(toLatinEquivalent("ćevapčići")); // Should output "cevapcici"

    // let latestEvent = await getLatestEvent();
    // await createVoucher(latestEvent);

    await createVoucherCodesFromMailchimp();

}

main();


