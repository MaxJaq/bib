/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre_rest = require('./maitre');
const fs = require('fs');

async function sandbox_michelin (searchLink = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/') {
  try {

    const restaurant = await michelin.scrapeRestaurant(searchLink);
	const jsonRest = [];

    for (let i = 0; i < restaurant.length;i++) {
      jsonRest.push(JSON.stringify(restaurant[i],null,2));
    }

    if (fs.existsSync('./michelin.json')) {
      fs.unlinkSync('./michelin.json')
    }

    fs.appendFileSync('./michelin.json',"[ \n");
    fs.appendFileSync('./michelin.json',jsonRest);
    fs.appendFileSync('./michelin.json',"]");
    console.log(restaurant);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_maitre(searchLink = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/#') {
  try {
    const maitre = await maitre_rest.scrapeRestaurantsMaitre(searchLink);
    console.log(maitre);
    const jsonRest = [];
    for (let i = 0; i < maitre.length;i++) {
      jsonRest.push(JSON.stringify(maitre[i],null,2));
    }

    if (fs.existsSync('./maitre.json')) {
      fs.unlinkSync('./maitre.json')
    }

    fs.appendFileSync('./maitre.json',"[ \n");
    fs.appendFileSync('./maitre.json',jsonRest);
    fs.appendFileSync('./maitre.json',"]");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, searchLink] = process.argv;

function bib(){
	var michelin_data = fs.readFileSync('michelin.json');
	var maitre_data = fs.readFileSync('maitre.json');
	var michelin = JSON.parse(michelin_data);
	var maitre = JSON.parse(maitre_data);
	const bib = [];
	for(var i=0; i<michelin.length;i++)
	{
		for(var j=0;j<maitre.length;j++)
		{
			if(michelin[i].name.toLowerCase()==maitre[j].toLowerCase())
			{
			bib.push(JSON.stringify(michelin[i],null,2));
			break;
			}
		}
	}
	if(fs.existsSync('./bib.json'))
	{
		fs.unlinkSync('./bib.json')
	}
	fs.appendFileSync('./bib.json',"[ \n");
	fs.appendFileSync('./bib.json',bib);
	fs.appendFileSync('./bib.json',"]");
}


//sandbox_michelin(searchLink);
//sandbox_maitre(searchLink);
bib();