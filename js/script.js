const $blackScreen=document.querySelector('.black-screen'),
 $cards=document.querySelectorAll('.main__item'),
 $form=document.getElementById('form'),
 $ok=document.querySelector('.Submit'),

 MAILER_URL='mailer.php',



 blackToggle=()=>$blackScreen.classList.toggle('black-screen_active'),

 onSelectCard=({currentTarget})=>{    
    blackToggle();    
   
    //LOAD LS 
    $form[0].value=localStorage.getItem('name')||'';
    $form[1].value=localStorage.getItem('phone')||'';
    $form[2].value=currentTarget.children[0].innerText;    

    $ok.disabled=true;
    formIsValid();
    
};

function formIsValid(){  
    //CHECK VALID  
    const name= (/^[A-Za-zА-Яа-я]{3,15}$/gi.test($form[0].value.trim()));  
    const phone=(/^[0-9]{10,12}$/.test($form[1].value));

    //VALID COLOR
    $form[0].style.color=name?'green':'red';
    $form[1].style.color=phone?'green':'red';

    $form[0].style.outline=`2px solid ${name?'green':'red'}`;
    $form[1].style.outline=`2px solid ${phone?'green':'red'}`;

    //SAVE LS
    localStorage.setItem('name',name?$form[0].value.trim():'');
    localStorage.setItem('phone',phone?$form[1].value:'');

    //LOCK ? BTN
    $ok.disabled=!(name&&phone);    
}

//SUBMIT
const onSubmit=event=>{
    event.preventDefault();
    const formData=new FormData(form);   
    formData.append('time',Date());
    const obj=Object.fromEntries(formData.entries());
    alert(JSON.stringify(obj,null,2));
    blackToggle();

    const request=new XMLHttpRequest();
    request.open("POST","mailer.php",true);
    request.addEventListener('load',function(){
        if(this.status==200)
        alert('Заказ принят 👍');
        else
        alert('Ошибка сети ‼️ Попробуйте снова');
    },{once:true});
    request.send(formData);
}

//EVENTS
$form[0].addEventListener('change',e=>console.log(e));
$blackScreen.addEventListener('click',e=>e.target==e.currentTarget&&blackToggle());
Array.from($cards).forEach(el=>el.addEventListener('click',onSelectCard));
$ok.addEventListener('click',onSubmit);
$form.addEventListener('input',formIsValid);



