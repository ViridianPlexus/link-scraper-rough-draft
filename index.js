const puppeteer = require('puppeteer');
// if grand object is empty, procede as normally, sort through and find the last whatever it was on and resume from there.
let the_links = [];
let counter = 0;
let max =10;
let letter_links = [];
let grand_object = {}


async function run (page_link){
  let success = false;
  while (!success) {
      try {
    let browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});

    function removeDuplicates(data) {
      return data.filter((value, index) => data.indexOf(value) === index);
  }

  async function object_stuffer(letter, object, link){
    console.log("Running 'object_stuffer' function... ")

    console.log("Running 'object_stuffer' function.. ")

    console.log("Running 'object_stuffer' function. ")

    console.log("\n")

    let new_links = [];
    let page = await browser.newPage();

    let maxRetries = 64;
  let retries = 0;
  let pageLoaded = false;
  let retryDelay = 3000; // 3 seconds delay between retries

  while (!pageLoaded && retries < maxRetries) {

    try {

      if (retries === 15){

        page = await browser.newPage();

      }

      if (retries === 35){
        await browser.close();
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        page = await browser.newPage();

      }
    await page.goto(link);
    pageLoaded = true; // If page.goto() succeeds, set pageLoaded to true to exit the loop
  } catch (error) {
      console.error(`Error during page navigation (Retry ${retries + 1}/${maxRetries}):`, error);
      retries++;
      await new Promise(resolve => setTimeout(resolve, retryDelay)); // Pause for retryDelay milliseconds
  }
}

if (!pageLoaded) {
  console.error(`Failed to navigate to the page after ${maxRetries} retries.`);
  // Handle the error appropriately, such as logging or throwing an error
  return; // or throw error;
}


    const html = await page.content();

    let elements = await page.$$('.hlh32.hdb.dil.tcbd');
    for (const element of elements)
      {
        // Extract the href attribute from each element
        const href = await page.evaluate(el => el.getAttribute('href'), element);
        // Push the href attribute into the new_links array
        new_links.push(href);
      }

    //put each word found in each link in an array
    //find definition, etymology, etc of word from internet
    //place that information in other places in array
    //number of rows is equal to the number of links
    let rows = new_links.length;
    let columns = 6; // You mentioned 6, but based on your usage, it seems you need 2 columns.
    // Initialize loaded_array as a two-dimensional array
    let loaded_array = [];
    // Initialize each row of the loaded_array
    for (let x = 0; x < rows; x++)
      {
          loaded_array[x] = []; // Initialize each row as an empty array
      }
    for(let x=0; x< rows; x++)
      {
        loaded_array[x][0]=new_links[x].split('https://dictionary.cambridge.org/us/browse/english/')[1]
        loaded_array[x][1]=new_links[x]
      }

    // take first link and get all other links found on that page, as other members of the
    //first array
    console.log("calling 'the_words_on_the_screen' function... ")

    console.log("\n")



    new_loaded_array = await the_words_on_the_screen(loaded_array)
    //send to another function that goes to that link, gets the word
    // gets the definition
    //gets the etymology from another website
    //later look for synonyms and ayntonyms
    // return new_loaded_array
    return new_loaded_array;
  }

  async function the_words_on_the_screen(loaded_array)
  {
    console.log("Running 'the_words_on_the_screen' function... ")

    console.log("Running 'the_words_on_the_screen' function.. ")

    console.log("Running 'the_words_on_the_screen' function. ")

    console.log("\n")
    column_height = 9; // definition, etymology, synonyms, antonyms, parts of speech, example scentence 0->3
    //take first link and get all other links found on that page, as other members of the first array
    let  page_url= loaded_array[0][1];

    //console.log(await browser.version());
    let page = await browser.newPage();
    const maxRetries = 64;
let retries = 0;
let pageLoaded = false;
const retryDelay = 3000; // 3 seconds delay between retries

while (!pageLoaded && retries < maxRetries) {
    try {
      if (retries === 15){

        page = await browser.newPage();

      }
      if (retries === 35){
        await browser.close();
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        page = await browser.newPage();

      }

    await page.goto(page_url);
    pageLoaded = true; // If page.goto() succeeds, set pageLoaded to true to exit the loop
  } catch (error) {
    console.error(`Error during page navigation (Retry ${retries + 1}/${maxRetries}):`, error);
    retries++;
    await new Promise(resolve => setTimeout(resolve, retryDelay)); // Pause for retryDelay milliseconds
}
}

if (!pageLoaded) {
console.error(`Failed to navigate to the page after ${maxRetries} retries.`);
// Handle the error appropriately, such as logging or throwing an error
return; // or throw error;
}

  //   await page.screenshot({path: 'antiwar.png', fullPage: true});
    let html = await page.content();
  // console.log(html)
    const title = await page.evaluate(()=> document.title );
    const text = await page.evaluate(() => document.body.innerText);
    let elements = await page.$$('div.hlh32.han a.tc-bd'); // Select the <a> elements directly



    let new_loaded_array =[ elements.length];

    for (let x = 0; x < elements.length; x++)
      {
        new_loaded_array[x] = []; // Initialize each row as an empty array
      }

      let p = 0;
      for (let element of elements) {

        const href = await page.evaluate(el => el.getAttribute('href'), element);
        new_loaded_array[p] = 'https://dictionary.cambridge.org' + href;

        p++;

    }



    for(let i= 0; i< new_loaded_array.length; i++ )
  {
    try {
      new_loaded_array[i][1] = await retryFunction(dictionary_fetcher, new_loaded_array[i]);
      // console.log('Dictionary result:', dictionaryResult);

      new_loaded_array[i][2] = await retryFunction(etymology_fetcher, new_loaded_array[i]);
      // console.log('Etymology result:', etymologyResult);
  } catch (error) {
      console.error('Error:', error);
  }

    new_loaded_array[i][1]=  await dictionary_fetcher(new_loaded_array[i])
  new_loaded_array[i][2] = await  etymology_fetcher(new_loaded_array[i])
  }

  return new_loaded_array

  }

  async function dictionary_fetcher(link_for_dict)
  {
    console.log("link for dict.: " + link_for_dict)

  const page = await browser.newPage();

  const maxRetries = 64;
 let retries = 0;
 let pageLoaded = false;
 const retryDelay  = 3000;

while (!pageLoaded && retries < maxRetries) {
    try {

      if (retries === 15){

        page = await browser.newPage();

      }
      if (retries === 35){
        await browser.close();
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        page = await browser.newPage();

      }

  await page.goto(link_for_dict);

  pageLoaded = true; // If page.goto() succeeds, set pageLoaded to true to exit the loop
} catch (error) {
    console.error(`Error during page navigation (Retry ${retries + 1}/${maxRetries}):`, error);
    retries++;
    await new Promise(resolve => setTimeout(resolve, retryDelay)); // Pause for retryDelay milliseconds
}
}

if (!pageLoaded) {
console.error(`Failed to navigate to the page after ${maxRetries} retries.`);
// Handle the error appropriately, such as logging or throwing an error
return; // or throw error;
}

  //await page.screenshot({path: 'antiwar.png', fullPage: true});
  const html = await page.content();
  // const title = await page.evaluate(()=> document.title );
  // console.log(title);
  //const text = await page.evaluate(() => document.body.innerText);

  const textContents = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.def.ddef_d.db')); // Select elements with class 'def ddef_d db'
    return elements.map(element => element.innerText); // Extract innerText from each element
  });

  console.log(textContents);

  //console.log("this will work: " + allText);

  return textContents;

  }

  async function etymology_fetcher(link_for_ety)
  {
    const hasNumbers = (str) => {
      return /\d/.test(str);
    };

    console.log(typeof link_for_ety )
    console.log( link_for_ety )



  // Remove the substring
  let modifiedLinkForEty = link_for_ety.replace('https://dictionary.cambridge.org/us/dictionary/english/', '');




  if((!hasNumbers(modifiedLinkForEty) )&& !(modifiedLinkForEty.includes('-')) ){


    console.log("ety catch successful");

    const page = await browser.newPage();


    const maxRetries = 64;
    let retries = 0;
    let pageLoaded = false;
    const retryDelay = 3000; // 3 seconds delay between retries

    while (!pageLoaded && retries < maxRetries) {
        try {

          if (retries === 15){

            page = await browser.newPage();

          }
          if (retries === 35){
            await browser.close();
            browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
            page = await browser.newPage();

          }
    await page.goto('https://www.etymonline.com/search?q='+modifiedLinkForEty);
    pageLoaded = true; // If page.goto() succeeds, set pageLoaded to true to exit the loop
    } catch (error) {
        console.error(`Error during page navigation (Retry ${retries + 1}/${maxRetries}):`, error);
        retries++;
        await new Promise(resolve => setTimeout(resolve, retryDelay)); // Pause for retryDelay milliseconds
    }
}

if (!pageLoaded) {
    console.error(`Failed to navigate to the page after ${maxRetries} retries.`);
    // Handle the error appropriately, such as logging or throwing an error
    return; // or throw error;
}
    // Use Puppeteer to select the specific element with the class name `word__name--TTbAA`
    const element = await page.$('.word__name--TTbAA');

    // Extract the text content from the selected element
    const textContent = await page.evaluate(element => element.textContent, element);



    console.log('https://www.etymonline.com/search?q='+modifiedLinkForEty + "\n");





  const title = await page.evaluate(()=> document.title );



  const actual_text = await page.$('.word__etymology_expand--1s7tE');
  const the_textContent = await page.evaluate(element => element.textContent, actual_text);



  console.log(title + "\n");
  console.log(textContent);
  // check if the title or whatever equals the word we seek, if not skip it, if so return the etymology
  console.log(the_textContent);


  // const text = await page.evaluate(() => document.body.innerText);

  // console.log(text); // Output: 0800 number

  // const targetText = await page.evaluate(() => {
  //   // Select the element containing the text "0800 number"
  //   const element = document.querySelector('.di-title .hw.dhw');

  //   // Return the inner text of the selected element
  //   return element.innerText.trim();
  return the_textContent;
  }
  else{

    console.log("ety catch miss");



  }


  }

  async function retryFunction(func, args, maxRetries = 64, delay = 180000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await func(args);
            console.log("this is args: " + args)
            return result;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait for a delay before retrying
        }
    }
    throw new Error(`Function failed after ${maxRetries} attempts`);
}

  //UI note
  console.log("Running 'run' function... ")

  console.log("Running 'run' function.. ")

  console.log("Running 'run' function. ")

  console.log("\n")

  //grand object holds 26 letter objects which will act as index style folders for all words beginning with that letter
  //variables:

  i= 0;
  const page = await browser.newPage();
  const maxRetries = 64;
  let retries = 0;
  let pageLoaded = false;
  const retryDelay = 3000; // 3 seconds delay between retries
//a page go to filtered

  while (!pageLoaded && retries < maxRetries) {
    try {

      if (retries === 15){
        page = await browser.newPage();

      }
      if (retries === 35){
        await browser.close();
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        page = await browser.newPage();

      }

  await page.goto(page_link);
  pageLoaded = true; // If page.goto() succeeds, set pageLoaded to true to exit the loop
} catch (error) {
  console.error(`Error during page navigation (Retry ${retries + 1}/${maxRetries}):`, error);
  retries++;
  await new Promise(resolve => setTimeout(resolve, retryDelay)); // Pause for retryDelay milliseconds
}
  }

if (!pageLoaded) {
  console.error(`Failed to navigate to the page after ${maxRetries} retries.`);
  // Handle the error appropriately, such as logging or throwing an error
  return; // or throw error;
}



  const html = await page.content();
  const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));

  for( let x in links)
  {
    the_links= the_links.concat(links[x]);
  }
  for(let x in links)
  {
    //many links found on page, here we grab only the ones that link to letter subsections
    if(links[x].includes('https://dictionary.cambridge.org/us/browse/english/')){
      letter_links[i]= links[x];
      i++;
    }
  }


  letter_links = removeDuplicates(letter_links);

  for( x in letter_links)
    {
      var holder_array;
      holder_array=letter_links[x].split('https://dictionary.cambridge.org/us/browse/english/');

      if(holder_array[0]===holder_array[1])
      {
        delete letter_links[x];
        //this is done to get rid of a artifact dont worry, or please understand and fix
      }

    }

    for(let r =0; r<letter_links.length; r++){
      if(letter_links[r]!=undefined)
    {  var holder_array;
      holder_array=letter_links[r].split('https://dictionary.cambridge.org/us/browse/english/');
      grand_object[holder_array[1]] = {};

    }
    }
    keys = Object.keys(grand_object);
    // for(let r =0; r<letter_links.length; r++){
    // //  console.log("this is a letter link: " + letter_links[r])
    // }

    console.log("Running 'run' function... ")

    console.log("Running 'run' function.. ")

    console.log("Running 'run' function. ")

    console.log("\n")



  for(x in keys)
    {

     console.log("calling object stuffer...")

      console.log("\n")

      ////console.log(grand_object[keys[x]])
      grand_object[keys[x]] = await  object_stuffer(keys[x], grand_object[keys[x]],letter_links[x])


    }

    await browser.close();

    console.log("made it to printing")

    const fs = require('fs');

// Assuming grand_object is defined and contains your data

// Define the file path
const filePath = 'output.txt';

// Open the file for writing
const stream = fs.createWriteStream('C:\\Users\\Viridian\\Downloads\\outputty.txt');

// Loop through each object in grand_object
for (let key in grand_object) {
    if (grand_object.hasOwnProperty(key)) {
        const array2D = grand_object[key]; // Access the 2D array

        // Write a label for the current object
        stream.write(`${key}:\n`);

        // Loop through each row of the 2D array
        array2D.forEach(row => {
            // Write the contents of the row to the file
            stream.write(row.join('\t') + '\n');
        });

        // Write a newline character to separate objects
        stream.write('\n');
    }
}

// Close the file stream
stream.end();

console.log('Contents of grand_object have been written to', filePath);

}catch (error) {
  // Handle the error
  console.error('An error occurred:', error.message);
  console.log('Restarting...');
  // Delay before restarting to avoid overwhelming the server
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
}
}
}










// synonyms_fetcher(link_for_syns)
// {console.log("link for dict.: " + link_for_syns)}

// antonyms_fetcher(link_for_ants)
// {console.log("link for dict.: " + link_for_ants)}




run('https://dictionary.cambridge.org/us/browse/english/');
console.log(the_links);
