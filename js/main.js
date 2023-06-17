$('.menu-toggler').click(function (e) {
    $('.back').toggle(500);
    if (!document.querySelector('.bars').classList.contains('d-none')) {
        document.querySelector('.bars').classList.add('d-none');
        document.querySelector('.fa-xmark').classList.remove('d-none');
    }
    else {
        document.querySelector('.bars').classList.remove('d-none');
        document.querySelector('.fa-xmark').classList.add('d-none');
    }
});
HomePage();
$('#Search').click(function () {
    $('#search').removeClass('d-none');
    SearchPage();
    $('.back').toggle(500);
    document.querySelector('.bars').classList.remove('d-none');
    document.querySelector('.fa-xmark').classList.add('d-none');
});
$('#Categories').click(function () {
    $('#search').addClass('d-none');
    CategoryPage();
    $('.back').toggle(500);
    document.querySelector('.bars').classList.remove('d-none');
    document.querySelector('.fa-xmark').classList.add('d-none');
});
$('#Area').click(function () {
    $('#search').addClass('d-none');
    AreaPage();
    $('.back').toggle(500);
    document.querySelector('.bars').classList.remove('d-none');
    document.querySelector('.fa-xmark').classList.add('d-none');
});
$('#Ingredients').click(function () {
    $('#search').addClass('d-none');
    IngredientsPage();
    $('.back').toggle(500);
    document.querySelector('.bars').classList.remove('d-none');
    document.querySelector('.fa-xmark').classList.add('d-none');
});
$('#Contact').click(function () {
    $('#search').addClass('d-none');
    ContactPage();
    $('.back').toggle(500);
    document.querySelector('.bars').classList.remove('d-none');
    document.querySelector('.fa-xmark').classList.add('d-none');
});



function DisplayMeals(meals) {
    document.querySelector('#main').innerHTML = `
    <div id="grid" class="row g-4">
    </div>
    `
    let temp = ``;
    for (let i = 0; i < meals.length; i++) {
        temp += `
        <div class="col-lg-3 col-md-6">
            <div class="item rounded-3 overflow-hidden" onclick='getMeal(${meals[i].idMeal})'>
                <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                <div class="item-content bg-white bg-opacity-75 d-flex align-items-center" >
                    <h2 class="fw-light m-2">${meals[i].strMeal}</h2>
                </div>
            </div>
        </div>
        `
    }
    document.querySelector('#grid').innerHTML = temp;
}

async function getMeal(mealID) {
    $(".loading").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    $(".loading").fadeOut(400)
    displayMeal(meal.meals[0])
}

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success bg-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    let tagsStr = ""
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 bg-danger bg-opacity-75 rounded ">${tags[i]}</li>`
    }

    let str = `
    <div class='row'>
    <div class="col-md-4 myM text-white text-center lead">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 myM text-white">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex flex-wrap list-unstyled" id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex list-unstyled " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn btn-danger youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>
                </div>`
    document.querySelector('#main').innerHTML = str
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
}


async function HomePage() {
    $(".loading").fadeIn(100)
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (result.ok && result.status == 200) {
        let dishes = await result.json();
        $(".loading").fadeOut(400)
        console.log(dishes.meals);
        DisplayMeals(dishes.meals);
    }

}


function SearchPage() {
    document.querySelector('#main').innerHTML = '';
    $('#name-search').keydown(function () {
        Searching(document.querySelector('#name-search').value);
    });
    $('#letter-search').keydown(function () {
        Searching(document.querySelector('#letter-search').value);
    });
}
async function Searching(key) {
    let result;
    $(".loading").fadeIn(100)
    if (key.length == 1) result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
    else result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
    if (result.ok && result.status == 200) {
        let dishes = await result.json();
        $(".loading").fadeOut(400)
        console.log(dishes.meals);
        DisplayMeals(dishes.meals);
    }
}

async function CategoryPage() {
    document.querySelector('#main').innerHTML = `
    <div id="grid" class="row g-4">
    </div>
    `
    $(".loading").fadeIn(100)
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    if (result.ok && result.status == 200) {
        let categories = await result.json();
        $(".loading").fadeOut(400)
        categories = categories.categories
        console.log(categories);
        let temp = ``;
        for (let i = 0; i < categories.length; i++) {
            temp += `
        <div class="col-lg-3 col-md-6">
            <div class="item rounded-3 overflow-hidden" onclick="GetCategory('${categories[i].strCategory}')">
                <img src="${categories[i].strCategoryThumb}" class="w-100" alt="">
                <div class="item-content bg-white bg-opacity-75 text-center">
                    <h2 class="fw-light">${categories[i].strCategory}</h2>
                    <p>${categories[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>
        `
        }
        document.querySelector('#grid').innerHTML = temp;
    }
}

async function GetCategory(category) {
    $(".loading").fadeIn(100)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    if (result.ok && result.status == 200) {
        let categorymeals = await result.json();
        $(".loading").fadeOut(400)
        categorymeals = categorymeals.meals;
        console.log(categorymeals);
        DisplayMeals(categorymeals);
    }
}


async function AreaPage() {
    document.querySelector('#main').innerHTML = `
    <div id="grid" class="row g-4">
    </div>
    `
    $(".loading").fadeIn(100)
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    if (result.ok && result.status == 200) {
        let area = await result.json();
        $(".loading").fadeOut(400)
        area = area.meals;
        console.log(area);
        let temp = ``;
        for (let i = 0; i < area.length; i++) {
            temp += `
        <div class="col-lg-3 col-md-6">
            <div class="area rounded-3 text-center shadow-lg py-2" onclick="GetArea('${area[i].strArea}')">
                <i class="fa-solid fa-city fa-3x text-danger"></i>
                <h2 class="text-white fw-light" >${area[i].strArea}</h2>
            </div>
        </div>
        `
        }
        document.querySelector('#grid').innerHTML = temp;
    }
}
async function GetArea(area) {
    $(".loading").fadeIn(100)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    if (result.ok && result.status == 200) {
        let areaMeals = await result.json();
        $(".loading").fadeOut(400)
        areaMeals = areaMeals.meals;
        console.log(areaMeals);
        DisplayMeals(areaMeals);
    }
}


async function IngredientsPage() {
    document.querySelector('#main').innerHTML = `
    <div id="grid" class="row g-4">
    </div>
    `
    $(".loading").fadeIn(100)
    let result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    if (result.ok && result.status == 200) {
        let ingredients = await result.json();
        $(".loading").fadeOut(400)
        ingredients = ingredients.meals;
        console.log(ingredients);
        let temp = ``;
        for (let i = 0; i < 20; i++) {
            temp += `
        <div class="col-lg-3 col-md-6">
            <div class="ingredient rounded-3 text-center shadow-lg overflow-hidden" onclick="GetIngredient('${ingredients[i].strIngredient}')">
                <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
                <h2 class="text-white fw-light">${ingredients[i].strIngredient}</h2>
                <p class="text-white fw-light h-auto fs-5">${ingredients[i].strDescription}</p>
            </div>
        </div>
        `
        }
        document.querySelector('#grid').innerHTML = temp;
    }
}
async function GetIngredient(ingredient) {
    $(".loading").fadeIn(100)
    let result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    if (result.ok && result.status == 200) {
        let ingredientMeals = await result.json();
        $(".loading").fadeOut(400)
        ingredientMeals = ingredientMeals.meals;
        console.log(ingredientMeals);
        DisplayMeals(ingredientMeals);
    }
}



function ContactPage() {
    document.querySelector('#main').innerHTML = `
    <div class="contactus row text-center m-auto text-white">
    <h2 class="mb-5">Contact US</h2>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="name" onkeyup="ValidName()" type="text" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter Your Name">
      <p id='nameMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Special Characters and Numbers not allowed</p>
    </div>
    </div>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="email" onkeyup="ValidEmail()" type="email" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter Email">
      <p id='emailMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Enter valid email. *Ex: xxx@yyy.zzz</p>
    </div>
    </div>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="phone" onkeyup="ValidPhone()" type="text" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter Phone">
      <p id='phoneMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Enter valid Phone Number</p>
    </div>
    </div>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="age" onkeyup="ValidAge()" type="number" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter Age">
      <p id='ageMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Enter valid Age</p>
    </div>
    </div>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="password" onkeyup="ValidPassword()" type="password" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter Password">
      <p id='passwordMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
    </div>
    <div class="col-md-6">
    <div class = "form-group">
      <input id="repassword" onkeyup="ValidRepassword()" type="password" name="" class=" mt-3 form-control bg-transparent text-secondary border-top-0 border-start-0 border-end-0 rounded-0 w-100 mx-auto" placeholder="Enter RePassword">
      <p id='repasswordMsg' class="bg-danger d-none w-100 m-auto mb-4 mt-1 text-black py-3 rounded-2">Enter valid Repassword</p>
    </div>
    </div>
    <button id='submit' disabled  class="btn btn-outline-danger w-25 mx-auto my-4">Submit</button>
  </div>
`
}

document.querySelector('#submit').addEventListener('mouseover', Validation);

function Validation() {
    if (ValidName() && ValidEmail() && ValidPhone() && ValidAge() && ValidPassword() && ValidRepassword()) {
        document.getElementById("submit").removeAttribute("disabled")
    } else {
        document.getElementById("submit").setAttribute("disabled", "true")
    }
}

function ValidName() {
    if (/^[a-zA-Z ]+$/.test($('#name').val())) {
        $('#name').removeClass("is-invalid");
        $('#name').addClass("is-valid");
        $('#nameMsg').addClass("d-none");
        Validation();
        return true;
    }
    else {
        $('#name').removeClass("is-valid");
        $('#name').addClass("is-invalid");
        $('#nameMsg').removeClass("d-none");
        Validation();
        return false;
    }
}

function ValidEmail() {
    if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#email').val())) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
        $('#emailMsg').addClass("d-none");
        Validation();
        return true;
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        $('#emailMsg').removeClass("d-none");
        Validation();
        return false;
    }
}

function ValidPhone() {
    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($('#phone').val())) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
        $('#phoneMsg').addClass("d-none");
        Validation();
        return true;
    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        $('#phoneMsg').removeClass("d-none");
        Validation();
        return false;
    }
}

function ValidAge() {
    if (/^[1-9][0-9]?$|^100$/.test($('#age').val())) {
        $('#age').removeClass("is-invalid");
        $('#age').addClass("is-valid");
        $('#ageMsg').addClass("d-none");
        Validation();
        return true;
    } else {
        $('#age').removeClass("is-valid");
        $('#age').addClass("is-invalid");
        $('#ageMsg').removeClass("d-none");
        Validation();
        return false;
    }
}

function ValidPassword() {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#password').val())) {
        $('#password').removeClass("is-invalid");
        $('#password').addClass("is-valid");
        $('#passwordMsg').addClass("d-none");
        Validation();
        return true;
    } else {
        $('#password').removeClass("is-valid");
        $('#password').addClass("is-invalid");
        $('#passwordMsg').removeClass("d-none");
        Validation();
        return false;
    }
}

function ValidRepassword() {
    if ($('#repassword').val() == $('#password').val()) {
        $('#repassword').removeClass("is-invalid");
        $('#repassword').addClass("is-valid");
        $('#repasswordMsg').addClass("d-none");
        Validation();
        return true;
    } else {
        $('#repassword').removeClass("is-valid");
        $('#repassword').addClass("is-invalid");
        $('#repasswordMsg').removeClass("d-none");
        Validation();
        return false;
    }
}
