import React from 'react';
import BibData from '../bib.json';
import './main.css';
function BibList() {
  return (
    <div>
			<center><h1> List of Restaurants of maitre restaurateur that have the Bib Gourmand distinction</h1></center>
		{BibData.map((bibDetail,index)=>{
			return <div class="card">
			<img class = "img" src={bibDetail.image} style = {{width:100 + '%'}}/>
			<h1 class="name">{bibDetail.name}</h1>
			<p class = "address">{bibDetail.loc}</p>
			 <button><a href={bibDetail.link}>Site Internet</a></button>
			
			<p>Téléphone {bibDetail.tel}</p>		
<br />			
			</div>
		})}
		
    </div>
  );
}

export default BibList;
