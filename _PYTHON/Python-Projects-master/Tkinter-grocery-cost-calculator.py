from Tkinter import *
import tkSimpleDialog
import tkMessageBox
import locale

locale.setlocale( locale.LC_ALL, '' )

items = []
itemPrices = []

def startScreen():
    itemString = ""
    itemTotal = 0
    for item in items:
        itemString += (item[1] + " " + item[0] + " (" + item[2] + " at " + item[3] + " each)\n")
    for itemPrice in itemPrices:
        itemTotal += itemPrice
    if itemString != "":
        itemString += ("--------------------------\n" + locale.currency(itemTotal) + "\n")
        
    grocName = tkSimpleDialog.askstring("Grocery List Calculator", itemString + "Add a new grocery item below, or type \"delete\" \nbefore the item name to remove the item.\nWhen you're done, type \"finished\"").capitalize()
    if "Delete" in grocName:
        delIndices = []
        for index, item in enumerate(items):
            if grocName[7:].capitalize() in item[0]:
                delIndices.append(index)
                
        for i in reversed(delIndices):
           del items[i] 
           del itemPrices[i] 
        startScreen()
    elif grocName == "Finished":
        tax = tkSimpleDialog.askfloat("Grocery List Calculator", "What is the sales tax? (ex. \"7\" = 7%)")
        itemTotal = itemTotal * (1 + tax * .01)
        itemString = ""
        for item in items:
            itemString += (item[1] + " " + item[0] + " (" + item[2] + " at " + item[3] + " each)\n")
        itemString += ("+" + str(tax) + "% sales tax\n--------------------------\n" + locale.currency(itemTotal) + "\n")
        tkMessageBox.showinfo("Full Grocery List", itemString)
    else:
        grocPrice = tkSimpleDialog.askfloat("Grocery List Calculator", "How much does one cost?")
        grocQuantity = tkSimpleDialog.askinteger("Grocery List Calculator", "How many are you getting?")
        items.append([grocName, str(locale.currency(grocPrice * grocQuantity)), str(grocQuantity), locale.currency(grocPrice)])
        itemPrices.append(grocPrice * grocQuantity)
        startScreen()
        
startScreen()