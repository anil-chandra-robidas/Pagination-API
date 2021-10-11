"use strict";

const list = document.querySelector('.pagi-content-wrapper');
const recall = document.querySelector('.pagination ul');

//data fetch from json data
async function fetchData() {
    const response  = await fetch('data.json');
    const resData   = await response.json();

    //display item function declare here
    const displayItems = (page, perPage) => {

        let index, offSet;

        if ( page == 1 || page <= 0 ) {
             index  = 0;
             offSet = perPage; 
        }
       else {
           index  = page * perPage - perPage;
           offSet = index + perPage;
       }
         

        const slicedItems = resData.slice(index, offSet);

        const output = slicedItems.map(item => {
            return `<div class="pagi-thumbnail">
            <img src="${item.url}" alt="" class="pagi-image">
            <div class="pagi-content">
                <h4 class="username">name: ${item.name}</h4>
                <p class="userage">Age: ${item.age}</p>
            </div>
        </div>`;
        });

        list.innerHTML = output.join("");
    }

    //pagination function 
    const displayPageNav = (perPage) => {
        let pagination    = '';
        const totalItems = resData.length;
        const pages = Math.ceil( totalItems / perPage );
        for( let i = 1; i <= pages; i++) {
            pagination += `<li class="mr-1"><a href="#" class="recall">${i}</a></li>`;
        }

        document.addEventListener('click', (e) => {
            if (e.target.className === 'recall') {
                displayItems(e.target.innerHTML, 3);
            }
        });

        recall.innerHTML = pagination;

    }
   
 
    let perPage = 3;
    displayPageNav(perPage);
    displayItems(1, perPage);

}

fetchData();