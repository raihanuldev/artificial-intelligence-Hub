const allData=()=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data => allDataShow(data.data.tools))
    
}
const shortByDate=()=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data => {
        const dataContainer=document.getElementById('data_container');
        dataContainer.innerText = ''
        let aiData =data.data.tools;
        aiData.sort((a,b)=> new Date(b.published_in) - new Date(a.published_in));
        showAllDetails(aiData);

    })
}

const SeeMoreButton=()=>{
    
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data =>showAll(data))
    
}
// display show section
const allDataShow=(data)=>{
    const loading = document.getElementById('loader')
    const dataContainer = document.getElementById('data_container');
    // display 6 items
    data =data.slice(0,6)
    
    for(singleData of data){
        
        const {id} = singleData;
        dataContainer.innerHTML +=`
        <div class="col">
                <div class="card h-100 rounded-lg">
                    <img src="${singleData.image?singleData.image:"No Image Found"}" class="card-img-top p-3 ">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <p class="card-text">
                      <ol>
                      <li>${singleData.features[0]?singleData.features[0]:"No Feauture here"}</li>
                      <li>${singleData.features[1]?singleData.features[1]:"No Feauture here"}</li>
                      <li>${singleData.features[2]?singleData.features[2]:"No Feauture here"}</li>
                      </ol>
                      </p>
                      <hr>
                      <div class="d-flex justify-content-between">
                        <div>
                        <h5 class="card-title text-bold">${singleData.name?singleData.name:"No Name Found"}</h5>
                        <i class="fa-solid fa-calendar-days"></i> ${singleData.published_in?singleData.published_in:"No Date Found"}
                        </div>
                        <div>
                        <button class="btn btn-danger p-3 rounded-lg mb-2" onclick="detailsShow('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                      </div>
                    </div>
                    
                </div>
        </div>
    `
    if(data <= 6){
        
        dataContainer.innerText=''
    }
    else{
        loading.classList.add('d-none')
    }
    }
    
    
}

const showAll = (aiData)=>{
    const dataConatiner = document.getElementById('data_container');
    dataConatiner.innerText = ''
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data => showAllDetails(data.data.tools))
}
const showAllDetails =(data,aiData)=>{
    const dataContainer = document.getElementById('data_container');
    
    data = data.slice(0,12)
    const loading = document.getElementById('loader')
    for(singleData of data){
        const {id} = singleData;
        dataContainer.innerHTML +=`
        <div class="col">
                <div class="card h-100 rounded-lg">
                    <img src="${singleData.image?singleData.image:"No Image Found"}" class="card-img-top p-3 ">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                      <p class="card-text">
                      <ol>
                      <li>${singleData.features[0]?singleData.features[0]:"No Feauture here"}</li>
                      <li>${singleData.features[1]?singleData.features[1]:"No Feauture here"}</li>
                      <li>${singleData.features[2]?singleData.features[2]:"No Feauture here"}</li>
                      </ol>
                      </p>
                      <hr>
                      <div class="d-flex justify-content-between">
                        <div>
                        <h5 class="card-title text-bold">${singleData.name?singleData.name:"No Name Found"}</h5>
                        <i class="fa-solid fa-calendar-days"></i> ${singleData.published_in?singleData.published_in:"No Date Found"}
                        </div>
                        <div>
                        <button class="btn btn-danger p-3 rounded-lg mb-2" onclick="detailsShow('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                      </div>
                    </div>
                    
                </div>
        </div>
    `
    }
    const seeMoreBtn = document.getElementById('seeMore');
    seeMoreBtn.classList.add('d-none')
    loading.classList.add('d-none')
}

const detailsShow =(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayDetails(data))
}


// modal section
const displayDetails =(data)=>{
    const modalContainer = document.getElementById('modalContent');
    const {description,Logo,image_link,features,input_output_examples,pricing,integrations,} = data.data;
    
    console.log(data.data.accuracy);
    modalContainer.innerHTML = `
    <div class="modal-header">
          <button type="button" class="btn-close z-3  p-2 rounded-3 position-absolute top-0 start-100 translate-middle" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" >
            <div class="p-3 d-md-flex gap-2">
                <div class="fristContainer gap-3">
                    <h5>${description}</h5>
                    <div class="d-flex row-cols-3">
                        <div class="priceing text-success">${pricing[0].plan?pricing[0].plan:"No Plan"} ${pricing[0].price?pricing[0].price:"Free"}</div>
                        <div class="priceing text-warning">${pricing[1].plan?pricing[1].plan:"No Plan"} ${pricing[1].price?pricing[1].price:"Free"}/</div>
                        <div class="priceing text-primary">${pricing[2].plan?pricing[2].plan:"No Plan"} ${pricing[2].price?pricing[2].price:"Free"}</div>
                    </div>
                    <div class="d-flex row-cols-2 p-3">
                        <div>
                            <h5>Futures</h5>
                            <li>${features[1]?features[1].feature_name:"Not Found"}</li>
                            <li>${features[2]?features[2].feature_name:"Not Found"}</li>
                            <li>${features[3]?features[3].feature_name:"Not Found"}</li>
                            
                        </div>
                        <div>
                            <h5>Integrations</h5>
                            <li>${integrations[0]?integrations[0]:"Not Found Data"}</li>
                            <li>${integrations[1]?integrations[1]:"Not Found Data"}</li>
                            <li>${integrations[2]?integrations[2]:"Not Found Data"}</li>
                        </div>
                        
                    </div>
                </div>
                <div class="fristContainer">
                    <div>
                        <div class="position-relative">
                        <button class="btn btn-danger z-3 position-absolute top-0 end-0 p-2 rounded-3">${data.data.accuracy.score?data.data.accuracy.score+"% accuracy":""}</button>
                        <img src="${image_link[0]}" class="img-fluid rounded-lg"/>
                        

                        </div>
                        <h4 class="text-center">${input_output_examples[0].input?input_output_examples[0].input :"Server Fetch Error"}</h4>
                        <p class="text-center">${input_output_examples[0].output?input_output_examples[0].output:"We Cannot Find Data"}</p>
                    </div>
                    
                </div>

            </div>
            
        </div>

    `
}
allData();
