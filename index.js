const puppeteer = require('puppeteer');
let the_links = [];
let counter = 0;
let max =10;
let letter_links = [];




async function run (page_link) {


//sort through links for
//  this extension
  //https://dictionary.cambridge.org/us/browse/english/

  //for each //new section area // make that an object within the object

  // slice off the url up until a point
  // make all left over slices the titles of objects in the grand objects



  // within each


  //

 let grand_object = {}

//  for(x in alphabet)
//     {
//       if ((alphabet[x]) != undefined)
//       {
//         grand_object[alphabet[x]] = {};
//       }
//     }


    const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
    //console.log(await browser.version());
    const page = await browser.newPage();
    await page.goto(page_link);
   //   await page.screenshot({path: 'antiwar.png', fullPage: true});
   const html = await page.content();
    // const title = await page.evaluate(()=> document.title );
    // console.log(title);
    //const text = await page.evaluate(() => document.body.innerText);
    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));

    // either judge the size of the sheet being filled up and/or wait for  an execution to be done
    for( x in links)
    {

        // console.log(links[x])
        // console.log(the_links)
        the_links= the_links.concat(links[x]);


        //run(links[x]);

    }

    i= 0;

    for( x in links)
    {
      if(links[x].includes('https://dictionary.cambridge.org/us/browse/english/')){
        letter_links[i]= links[x];
        i++;

      }

    }



  //  // https://dictionary.cambridge.org/us/browse/english/
  //   the_links.includes('at');


    console.log(the_links)

    console.log(letter_links);

    function removeDuplicates(data) {
      return data.filter((value, index) => data.indexOf(value) === index);
  }

  letter_links = removeDuplicates(letter_links);


  console.log(letter_links);

  for( x in letter_links)
    {
      var holder_array;



      holder_array=letter_links[x].split('https://dictionary.cambridge.org/us/browse/english/');
      if(holder_array[0]===holder_array[1]){
        delete letter_links[x];
      }



      // if(links[x]){
      //   letter_links[i]= links[x];
      //   i++;

      // }

    }

    console.log(letter_links);

    for(let r =0; r<letter_links.length; r++){

      if(letter_links[r]!=undefined)
    {  var holder_array;
      holder_array=letter_links[r].split('https://dictionary.cambridge.org/us/browse/english/');
      grand_object[holder_array[1]] = {};

}
    }


    keys = Object.keys(grand_object);

  for(x in keys)
    {
      ////console.log(grand_object[keys[x]])
      grand_object[keys[x]] =  object_stuffer(keys[x], grand_object[keys[x]], )

    }





    // keys = Object.keys(grand_object);
    // console.log(keys)

    // for( x in grand_object){

    //   grand_object[x]


    // let rows = grand_object[x].length
    // let columns= 6
    // }



    // grand_object_aftr_enumeration = link_enumerator(grand_object);






  await browser.close();

}


function link_enumerator(maelstrom){

  for (var letter in maelstrom) {




}
}

function object_stuffer(letter, object){

   // let rows = grand_object[x].length
    // let columns= 6




}


run('https://dictionary.cambridge.org/us/browse/english/');

console.log(the_links);
