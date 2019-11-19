//This rotine is to keep the button always in the navBar on
//gitHub page
const update = () =>{	
    let observer = new MutationObserver( () => 	
    {   	
        zenhubOnClick()
        if(document.getElementById('gbdButton') !== null)	
        {   		
            gbdButtonOnClick()	
        }
    })	

    observer.observe(document, {	
        subtree: true,	
        childList: true	
    })	
}
