const calculate = (n1, operator, n2) => {//calculate function
    let result = ''
    
    if(operator === 'add'){
        result = parseFloat(n1)+parseFloat(n2)
    }else if(operator === 'subtract'){
        result = parseFloat(n1)-parseFloat(n2)
    }else if(operator === 'multiply'){
        result = parseFloat(n1)*parseFloat(n2)
    }else if(operator === 'divide'){
        result = parseFloat(n1)/parseFloat(n2)
    }
    return result
}
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')//selecting the container div containing all the calculator keys
const display = document.querySelector('.calculator_display')
keys.addEventListener('click',e=>{
   
    
    if(e.target.matches('button')){
        
        const key = e.target //gets the value of the clicked key or the targeted key
        const action = key.dataset.action //accessing the data-action attribute of dataset property
        const keyContent = key.textContent //getting the text content of the clicked key in a variable
        const displayedNum = display.textContent //getting the text content of the claculator display class
        const previousKeyType = calculator.dataset.previousKeyType
        
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))//remove is-depressed class from all the keys
        if(!action){
            //console.log("number key!")
            calculator.dataset.previousKeyType = 'number'
             if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){//if cal shows 0, replace display with the clicked key
                display.textContent = keyContent
            }else{//if cal shows non zero num, append the clicked key to the displayed num
                display.textContent = displayedNum + keyContent
            }
        }
        if(action ==='add' || action === 'subtract' || action === 'multiply' || action === 'divide'){
            //console.log("operator key!")
            key.classList.add('is-depressed')//adding class to key pressed to highlight it
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            if(firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate'){
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
            
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }
        if(action === 'decimal'){
           // console.log("decimal key!")
           
            if(!displayedNum.includes('.')){
             display.textContent = displayedNum + '.'
            }else if(previousKeyType === 'operator' || previousKeyType === 'calculator'){
                display.textContent = '0.'
            }
             calculator.dataset.previousKeyType = 'decimal'
        }
        if(action === 'clear'){
            if(key.textContent === 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }else{
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        if(action !== 'clear'){
            const clearButton = calculator.querySelector('[data-action = clear]')
            clearButton.textContent = 'CE'
        }
        if(action === 'calculate'){
            //console.log("equal key!")
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            
            if(firstValue){
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
            
            display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
       
       
    }
   

})













