"use strict"
import { activeModal } from "../../components/modalBox.js";
export class WorkSheetView {

    constructor(tabsContents){

        this._tabContents = tabsContents;
        

    }

    templateTab(model) {

        const spaceTabs = document.createElement("div");
        spaceTabs.classList.add("tabs");

        const buttonCreateTab = document.createElement("button");
        buttonCreateTab.classList.add("tabs__button__add"); 
        buttonCreateTab.setAttribute("data-add-worksheet", "");
        buttonCreateTab.innerHTML = `Criar Planilha`;
        const modalBox =  document.querySelector('[data-modalbox]');
        buttonCreateTab.addEventListener('click' , () => activeModal(modalBox));

        spaceTabs.appendChild(buttonCreateTab);
        model.worksheets.map((w) => {    
            const newTab = document.createElement("button");
            newTab.classList.add(`tabs__button`);
            newTab.classList.add(`tabs__${w.nameWorksheet.replace(/\s+/g, '').replace(/\.+/g , '')}`);
            newTab.classList.add(`${w.nameWorksheet.replace(/\s+/g, '').replace(/\.+/g , '')}`);
            newTab.innerHTML = `${w.nameWorksheet}`;
            const deletTab = document.createElement("span");
            deletTab.classList.add("close__delete");
            deletTab.setAttribute("data-exclude", "");
            deletTab.innerHTML = " &#128473;";

            newTab.appendChild(deletTab);

            spaceTabs.appendChild(newTab);
              
        });

        const checkTabs = this._tabContents.querySelector(".tabs");
        if(checkTabs == undefined){
          return spaceTabs;  
        }
        else{
            checkTabs.remove();
            return spaceTabs;
        }
        
        /*`
            <button class="" data-add-worksheet>Criar Planilha</button>
             `*/

    }
    
    templateContent(model){

        const spaceContent = document.createElement("div");
        spaceContent.classList.add("contents");

        model.worksheets.map( (w) => {
            const newContent = document.createElement("div");
            newContent.classList.add("tab__content");
            newContent.classList.add("invisible");
            newContent.setAttribute("id", `tabs__${w.nameWorksheet.replace(/\s+/g, '').replace(/\.+/g , '')}` );

            
            
            
            const spaceWorksheets = document.createElement("div");
            spaceWorksheets.setAttribute(`data-${w.nameWorksheet.replace(/\s+/g, '').replace(/\.+/g , '')}`, "");

            newContent.appendChild(this._formWorksheetController(w.nameWorksheet, w.workSheetControl.add));
            newContent.appendChild(spaceWorksheets);

            spaceContent.appendChild(newContent);
        });

        const checkContents = this._tabContents.querySelector(".contents");
        if(checkContents == undefined){
            return spaceContent;
        }
        else{
            checkContents.remove();
            return spaceContent;
        }
    }

    update(model){
        this._tabContents.appendChild(this.templateTab(model));
        this._tabContents.appendChild(this.templateContent(model));
        

    }

    _formWorksheetController(nameWorksheet,workSheetControl){
        const formWController = document.createElement("form");
        const formatName = nameWorksheet.replace(/\s+/g, '').replace(/\.+/g , '');
        formWController.setAttribute(`data-controller-${formatName}`, "");

        
        const labelReceipt = document.createElement("label");
        labelReceipt.innerHTML = "Defina o nome do campo 'RECEITA'"
        const inputReceipt = document.createElement("input");
        inputReceipt.classList.add("receipt");
        const labelExpense = document.createElement("label");
        labelExpense.innerHTML = "Defina o nome do campo 'DESPESA'"
        const inputExpense = document.createElement("input");
        inputExpense.classList.add("expense");
        const button = document.createElement("button");
        button.innerHTML = "SALVAR"

        formWController.appendChild(labelReceipt)
        formWController.appendChild(inputReceipt)
        formWController.appendChild(labelExpense)
        formWController.appendChild(inputExpense)
        formWController.appendChild(button);

        formWController.addEventListener("submit", (event) =>{
            event.preventDefault();
            const receipt = formWController.querySelector(".receipt");
            const expense = formWController.querySelector(".expense");
            
            workSheetControl(receipt.value, expense.value, nameWorksheet);
        })

        return formWController;
    }
}