import Tkinter
from Tkinter import *
import time
import inspect
import random
import cmath, math
from PIL import Image, ImageTk

class Invincibility:
    def __init__(self, canvas_copy):
        self.x = random.randrange(30, 670)
        self.y = random.randrange(30, 370)
        self.r = 0
        self.g = 0
        self.b = 0
        self.upRed = True
        self.downRed = False
        self.upBlue = False
        self.downBlue = False
        self.upGreen = False
        self.downGreen = False
        self.invisible = False
        self.canvas = canvas_copy
        self.body = self.canvas.create_oval(self.x, self.y, self.x+20, self.y+20, fill = "black")
    def changeColor(self):  
        #Red
        if self.upRed:
            self.r+=10
            if self.r >= 255:
                self.upRed = False
                self.downRed = True
                self.upGreen = True
        if self.downRed:
            self.r-=10
            if self.r <= 0:
                self.downRed = False
        #Green        
        if self.upGreen:
            self.g+=10
            if self.g >= 255:
                self.upGreen = False
                self.downGreen = True
                self.upBlue = True
        if self.downGreen:
            self.g-=10
            if self.g <= 0:
                self.downGreen = False
        #Blue        
        if self.upBlue:
            self.b+=10
            if self.b >= 255:
                self.upBlue = False
                self.downBlue = True
                self.upRed = True
        if self.downBlue:
            self.b-=10
            if self.b <= 0:
                self.downBlue = False
                
        color = "#%02x%02x%02x" % (self.r, self.g, self.b)
        self.canvas.itemconfig(self.body, fill=color)
    def changePos(self):
        print("redrawing")
        if not self.invisible:
            self.canvas.delete(self.body)
        self.invisible = False
        self.x = random.randrange(30, 670)
        self.y = random.randrange(30, 370)
        self.r = 0
        self.g = 0
        self.b = 0
        self.upRed = True
        self.downRed = False
        self.upBlue = False
        self.downBlue = False
        self.upGreen = False
        self.downGreen = False
        self.body = self.canvas.create_oval(self.x, self.y, self.x+20, self.y+20, fill = "black")
    def makeInvisible(self):
        self.canvas.delete(self.body)
        self.invisible = True
        
class BlueBike:
    def __init__(self, canvas_copy):
        self.score = 0
        self.x = 50
        self.y = 175
        self.xV = 4
        self.yV = 0
        self.r = 0
        self.g = 0
        self.b = 0
        self.upRed = True
        self.downRed = False
        self.upBlue = False
        self.downBlue = False
        self.upGreen = False
        self.downGreen = False
        self.canvas = canvas_copy
        self.trail = []
        self.trailCoords = []
        self.parts = []
        self.invinsible = False
        self.orangeScore = self.canvas.create_text(345, 50, text="SCORE 0", fill = "white")
        self.drawBike()
    
    def drawBike(self):
        part1 = self.canvas.create_oval(self.x-25, self.y-6, self.x-19, self.y+6, fill = "black")
        part2 = self.canvas.create_rectangle(self.x-22, self.y-6, self.x-10, self.y+6, fill = "black")
        part3 = self.canvas.create_rectangle(self.x-10, self.y-4, self.x+10, self.y+4, fill = "black")
        part4 = self.canvas.create_rectangle(self.x+10, self.y-7, self.x+22, self.y+7, fill = "black")
        part5 = self.canvas.create_oval(self.x+19, self.y+7, self.x+25, self.y-7, fill = "black")
        part6 = self.canvas.create_polygon(self.x-20, self.y-8, self.x-12, self.y-8, self.x-9, self.y-6, self.x-23, self.y-6, fill = "cyan")
        part7 = self.canvas.create_polygon(self.x-20, self.y+8, self.x-12, self.y+8, self.x-9, self.y+6, self.x-23, self.y+6, fill = "cyan")
        part8 = self.canvas.create_polygon(self.x+20, self.y-9, self.x+12, self.y-9, self.x+9, self.y-7, self.x+23, self.y-7, fill = "cyan")  
        part9 = self.canvas.create_polygon(self.x+20, self.y+9, self.x+12, self.y+9, self.x+9, self.y+7, self.x+23, self.y+7, fill = "cyan") 
        part10 = self.canvas.create_polygon(self.x+4, self.y-6, self.x+6, self.y-12, self.x+12, self.y-14, self.x+14, self.y-14, self.x+15, self.y-12, self.x+13, self.y-12, self.x+8, self.y-9, self.x+6, self.y-6, fill = "black")
        part11 = self.canvas.create_polygon(self.x+4, self.y+6, self.x+6, self.y+12, self.x+12, self.y+14, self.x+14, self.y+14, self.x+15, self.y+12, self.x+13, self.y+12, self.x+8, self.y+9, self.x+6, self.y+6, fill = "black")
        part12 = self.canvas.create_polygon(self.x-5, self.y-6, self.x-5, self.y-8, self.x-14, self.y-10, self.x-16, self.y-15, self.x-14, self.y-14, self.x-1, self.y-12, self.x-2, self.y-6, fill = "black")
        part13 = self.canvas.create_polygon(self.x-5, self.y+6, self.x-5, self.y+8, self.x-14, self.y+10, self.x-16, self.y+15, self.x-14, self.y+14, self.x-1, self.y+12, self.x-2, self.y+6, fill = "black")
        part14 = self.canvas.create_rectangle(self.x-6, self.y-6, self.x+8, self.y+6, fill = "black")
        part15 = self.canvas.create_line(self.x-8, self.y-2, self.x+2, self.y-2, fill = "cyan")
        part16 = self.canvas.create_line(self.x-8, self.y-2, self.x-6, self.y-8, fill = "cyan")
        part17 = self.canvas.create_line(self.x-8, self.y+2, self.x+2, self.y+2, fill = "cyan")
        part18 = self.canvas.create_line(self.x-8, self.y+2, self.x-6, self.y+8, fill = "cyan")
        part19 = self.canvas.create_oval(self.x, self.y-2, self.x+4, self.y+2, outline="cyan")  
        part20 = self.canvas.create_oval(self.x+8, self.y-2, self.x+12, self.y+2, outline="cyan") 
        part21 = self.canvas.create_rectangle(self.x+7, self.y-3, self.x+10, self.y+3, fill = "black")
        
        self.parts.append(part1)
        self.parts.append(part2)
        self.parts.append(part3)
        self.parts.append(part4)
        self.parts.append(part5)
        self.parts.append(part6)
        self.parts.append(part7)
        self.parts.append(part8)
        self.parts.append(part9)
        self.parts.append(part10)
        self.parts.append(part11)
        self.parts.append(part12)
        self.parts.append(part13)
        self.parts.append(part14)
        self.parts.append(part15)
        self.parts.append(part16)
        self.parts.append(part17)
        self.parts.append(part18)
        self.parts.append(part19)
        self.parts.append(part20)
        self.parts.append(part21) 
        
    def reset(self):
        self.score += 1
        self.x = 50
        self.y = 175
        self.xV = 4
        self.yV = 0
        for p in self.parts:
            self.canvas.delete(p)
        del(self.parts[:])
        self.canvas.delete(self.orangeScore)
        self.orangeScore = self.canvas.create_text(345, 50, text="SCORE "+str(self.score), fill = "white")
        self.drawBike()
        
    def rotShape(self, angle, coords, center):
        offset = complex(center[0], center[1])
        newxy = []
        for i in range(0, len(coords), 2):
            x = coords[i]
            y = coords[i+1]
            v = angle * (complex(x, y) - offset) + offset
            newxy.append(v.real)
            newxy.append(v.imag)
        return newxy
    def up(self):
        if self.xV == 4:
            angle = cmath.exp((-math.pi/2)*1j)
        elif self.yV == 4:
            angle = cmath.exp((-math.pi)*1j)
        else:
            angle = cmath.exp((math.pi/2)*1j)
        center = [self.x, self.y]
        if self.yV != -4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 0
        self.yV = -4
    def left(self):
        if self.xV == 4:
            angle = cmath.exp((-math.pi)*1j)
        elif self.yV == 4:
            angle = cmath.exp((math.pi/2)*1j)
        else:
            angle = cmath.exp((-math.pi/2)*1j)
        
        center = [self.x, self.y]
        if self.xV != -4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = -4
        self.yV = 0
    def down(self):
        if self.xV == 4:
            angle = cmath.exp((math.pi/2)*1j)
        elif self.yV == -4:
            angle = cmath.exp((-math.pi)*1j)
        else:
            angle = cmath.exp((-math.pi/2)*1j)
        center = [self.x, self.y]
        if self.yV != 4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 0
        self.yV = 4
    def right(self):
        if self.yV == 4:
            angle = cmath.exp((-math.pi/2)*1j)
        elif self.yV == -4:
            angle = cmath.exp((math.pi/2)*1j)
        else:
            angle = cmath.exp((math.pi)*1j)
        center = [self.x, self.y]
        if self.xV != 4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 4
        self.yV = 0
        
    def move(self, inv):
        for p in self.parts:
            self.canvas.move(p, self.xV, self.yV)
        self.x += self.xV
        self.y += self.yV
        blueCoords.append((self.x, self.y)) 
        rect = self.canvas.create_rectangle(self.x-2, self.y-2, self.x+2, self.y+2, fill = "cyan", outline = "")
        self.trail.append(rect)
        if len(blueCoords) > 300:
            del(blueCoords[0])  
            self.canvas.delete(self.trail[0])
            del(self.trail[0])
        
        if not self.invinsible:        
            tempBlueCoords = []
            tempOrangeCoords = []
            if len(blueCoords) > 5:
                for i in range(0, len(blueCoords)-5):
                    tempBlueCoords.append(blueCoords[i])
                for x, y in tempBlueCoords:
                    if (self.x == x and self.y == y):
                        del(blueCoords[:])
                        for p in self.trail:
                            self.canvas.delete(p)
                        del(self.trail[:])
                        self.reset()
            if len(orangeCoords) > 5:
                for i in range(0, len(orangeCoords)-5):
                    tempOrangeCoords.append(orangeCoords[i])
                for x, y in orangeCoords:
                    if (self.x == x and self.y == y):
                        del(blueCoords[:])
                        for p in self.trail:
                            self.canvas.delete(p)
                        del(self.trail[:])
                        self.reset()
        if self.x < 0 or self.x > 700 or self.y < 0 or self.y > 400:
            del(blueCoords[:])
            for p in self.trail:
                self.canvas.delete(p)
            del(self.trail[:])
            self.reset()
            
        if inv.x < self.x and inv.x+20 > self.x and inv.y < self.y and inv.y+20 > self.y:
            self.invinsible = True
            inv.makeInvisible()
            
    def changeColor(self):  
        #Red
        if self.upRed:
            self.r+=10
            if self.r >= 255:
                self.upRed = False
                self.downRed = True
                self.upGreen = True
        if self.downRed:
            self.r-=10
            if self.r <= 0:
                self.downRed = False
        #Green        
        if self.upGreen:
            self.g+=10
            if self.g >= 255:
                self.upGreen = False
                self.downGreen = True
                self.upBlue = True
        if self.downGreen:
            self.g-=10
            if self.g <= 0:
                self.downGreen = False
        #Blue        
        if self.upBlue:
            self.b+=10
            if self.b >= 255:
                self.upBlue = False
                self.downBlue = True
                self.upRed = True
        if self.downBlue:
            self.b-=10
            if self.b <= 0:
                self.downBlue = False
                
        color = "#%02x%02x%02x" % (self.r, self.g, self.b)
        self.canvas.itemconfig(self.parts[5], fill=color)
        self.canvas.itemconfig(self.parts[6], fill=color)
        self.canvas.itemconfig(self.parts[7], fill=color)
        self.canvas.itemconfig(self.parts[8], fill=color)
        self.canvas.itemconfig(self.parts[14], fill=color)
        self.canvas.itemconfig(self.parts[15], fill=color)
        self.canvas.itemconfig(self.parts[16], fill=color)
        self.canvas.itemconfig(self.parts[17], fill=color)
        self.canvas.itemconfig(self.parts[18], fill=color)
        self.canvas.itemconfig(self.parts[19], fill=color) 
         
    def resetColor(self):
        self.canvas.itemconfig(self.parts[5], fill="cyan")
        self.canvas.itemconfig(self.parts[6], fill="cyan")
        self.canvas.itemconfig(self.parts[7], fill="cyan")
        self.canvas.itemconfig(self.parts[8], fill="cyan")
        self.canvas.itemconfig(self.parts[14], fill="cyan")
        self.canvas.itemconfig(self.parts[15], fill="cyan")
        self.canvas.itemconfig(self.parts[16], fill="cyan")
        self.canvas.itemconfig(self.parts[17], fill="cyan")
        self.canvas.itemconfig(self.parts[18], fill="cyan")
        self.canvas.itemconfig(self.parts[19], fill="cyan")  

class OrangeBike:
    def __init__(self, canvas_copy):
        self.score = 0
        self.x = 650
        self.y = 175
        self.xV = 4
        self.yV = 0
        self.r = 0
        self.g = 0
        self.b = 0
        self.upRed = True
        self.downRed = False
        self.upBlue = False
        self.downBlue = False
        self.upGreen = False
        self.downGreen = False
        self.canvas = canvas_copy
        self.trail = []
        self.trailCoords = []
        self.parts = []
        self.angle = 0
        self.invinsible = False
        
        self.blueScore = self.canvas.create_text(270, 50, text="0", fill = "white")
        self.drawBike()
    
    def drawBike(self):
        part1 = self.canvas.create_oval(self.x-25, self.y-6, self.x-19, self.y+6, fill = "black")
        part2 = self.canvas.create_rectangle(self.x-22, self.y-6, self.x-10, self.y+6, fill = "black")
        part3 = self.canvas.create_rectangle(self.x-10, self.y-4, self.x+10, self.y+4, fill = "black")
        part4 = self.canvas.create_rectangle(self.x+10, self.y-7, self.x+22, self.y+7, fill = "black")
        part5 = self.canvas.create_oval(self.x+19, self.y+7, self.x+25, self.y-7, fill = "black")
        part6 = self.canvas.create_polygon(self.x-20, self.y-8, self.x-12, self.y-8, self.x-9, self.y-6, self.x-23, self.y-6, fill = "orange")
        part7 = self.canvas.create_polygon(self.x-20, self.y+8, self.x-12, self.y+8, self.x-9, self.y+6, self.x-23, self.y+6, fill = "orange")
        part8 = self.canvas.create_polygon(self.x+20, self.y-9, self.x+12, self.y-9, self.x+9, self.y-7, self.x+23, self.y-7, fill = "orange")  
        part9 = self.canvas.create_polygon(self.x+20, self.y+9, self.x+12, self.y+9, self.x+9, self.y+7, self.x+23, self.y+7, fill = "orange") 
        part10 = self.canvas.create_polygon(self.x+4, self.y-6, self.x+6, self.y-12, self.x+12, self.y-14, self.x+14, self.y-14, self.x+15, self.y-12, self.x+13, self.y-12, self.x+8, self.y-9, self.x+6, self.y-6, fill = "black")
        part11 = self.canvas.create_polygon(self.x+4, self.y+6, self.x+6, self.y+12, self.x+12, self.y+14, self.x+14, self.y+14, self.x+15, self.y+12, self.x+13, self.y+12, self.x+8, self.y+9, self.x+6, self.y+6, fill = "black")
        part12 = self.canvas.create_polygon(self.x-5, self.y-6, self.x-5, self.y-8, self.x-14, self.y-10, self.x-16, self.y-15, self.x-14, self.y-14, self.x-1, self.y-12, self.x-2, self.y-6, fill = "black")
        part13 = self.canvas.create_polygon(self.x-5, self.y+6, self.x-5, self.y+8, self.x-14, self.y+10, self.x-16, self.y+15, self.x-14, self.y+14, self.x-1, self.y+12, self.x-2, self.y+6, fill = "black")
        part14 = self.canvas.create_rectangle(self.x-6, self.y-6, self.x+8, self.y+6, fill = "black")
        part15 = self.canvas.create_line(self.x-8, self.y-2, self.x+2, self.y-2, fill = "orange")
        part16 = self.canvas.create_line(self.x-8, self.y-2, self.x-6, self.y-8, fill = "orange")
        part17 = self.canvas.create_line(self.x-8, self.y+2, self.x+2, self.y+2, fill = "orange")
        part18 = self.canvas.create_line(self.x-8, self.y+2, self.x-6, self.y+8, fill = "orange")
        part19 = self.canvas.create_oval(self.x, self.y-2, self.x+4, self.y+2, outline="orange")  
        part20 = self.canvas.create_oval(self.x+8, self.y-2, self.x+12, self.y+2, outline="orange") 
        part21 = self.canvas.create_rectangle(self.x+7, self.y-3, self.x+10, self.y+3, fill = "black")
        
        self.parts.append(part1)
        self.parts.append(part2)
        self.parts.append(part3)
        self.parts.append(part4)
        self.parts.append(part5)
        self.parts.append(part6)
        self.parts.append(part7)
        self.parts.append(part8)
        self.parts.append(part9)
        self.parts.append(part10)
        self.parts.append(part11)
        self.parts.append(part12)
        self.parts.append(part13)
        self.parts.append(part14)
        self.parts.append(part15)
        self.parts.append(part16)
        self.parts.append(part17)
        self.parts.append(part18)
        self.parts.append(part19)
        self.parts.append(part20)
        self.parts.append(part21) 
        
        self.left()
    
    def reset(self):
        self.score+=1
        self.x = 650
        self.y = 175
        self.xV = 4
        self.yV = 0
        for p in self.parts:
            self.canvas.delete(p)
        del(self.parts[:])
        self.canvas.delete(self.blueScore)
        if self.score < 10:
            self.blueScore = self.canvas.create_text(270, 50, text=str(self.score), fill = "white")
        else:
            self.blueScore = self.canvas.create_text(265, 50, text=str(self.score), fill = "white")
        self.drawBike()
        
    def rotShape(self, angle, coords, center):
        offset = complex(center[0], center[1])
        newxy = []
        for i in range(0, len(coords), 2):
            x = coords[i]
            y = coords[i+1]
            v = angle * (complex(x, y) - offset) + offset
            newxy.append(v.real)
            newxy.append(v.imag)
        return newxy
    def up(self):
        if self.xV == 4:
            angle = cmath.exp((-math.pi/2)*1j)
        elif self.yV == 4:
            angle = cmath.exp((-math.pi)*1j)
        else:
            angle = cmath.exp((math.pi/2)*1j)
        center = [self.x, self.y]
        if self.yV != -4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 0
        self.yV = -4
    def left(self):
        if self.xV == 4:
            angle = cmath.exp((-math.pi)*1j)
        elif self.yV == 4:
            angle = cmath.exp((math.pi/2)*1j)
        else:
            angle = cmath.exp((-math.pi/2)*1j)
        
        center = [self.x, self.y]
        if self.xV != -4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = -4
        self.yV = 0
    def down(self):
        if self.xV == 4:
            angle = cmath.exp((math.pi/2)*1j)
        elif self.yV == -4:
            angle = cmath.exp((-math.pi)*1j)
        else:
            angle = cmath.exp((-math.pi/2)*1j)
        center = [self.x, self.y]
        if self.yV != 4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 0
        self.yV = 4
    def right(self):
        if self.yV == 4:
            angle = cmath.exp((-math.pi/2)*1j)
        elif self.yV == -4:
            angle = cmath.exp((math.pi/2)*1j)
        else:
            angle = cmath.exp((math.pi)*1j)
        center = [self.x, self.y]
        if self.xV != 4:
            for p in self.parts:
                coords = canvas.coords(p)
                newCoords = self.rotShape(angle, coords, center)
                newCoordInts = []
                for coord in newCoords:
                    newCoordInts.append(int(coord))
                if len(coords) == 4:
                    canvas.coords(p, newCoordInts[0], newCoordInts[1], newCoordInts[2], newCoordInts[3])
                else:
                    canvas.coords(p, *newCoords)
        self.xV = 4
        self.yV = 0
        
    def move(self, inv):
        for p in self.parts:
            self.canvas.move(p, self.xV, self.yV)
        self.x += self.xV
        self.y += self.yV
        orangeCoords.append((self.x, self.y)) 
        rect = self.canvas.create_rectangle(self.x-2, self.y-2, self.x+2, self.y+2, fill = "orange", outline = "")
        self.trail.append(rect)
        if len(orangeCoords) > 300:
            del(orangeCoords[0])  
            self.canvas.delete(self.trail[0])
            del(self.trail[0])
        if not self.invinsible:    
            tempBlueCoords = []
            tempOrangeCoords = []
            if len(blueCoords) > 5:
                for i in range(0, len(blueCoords)-5):
                    tempBlueCoords.append(blueCoords[i])
                for x, y in blueCoords:
                    if (self.x == x and self.y == y):
                        del(orangeCoords[:])
                        for p in self.trail:
                            self.canvas.delete(p)
                        del(self.trail[:])
                        self.reset()
            if len(orangeCoords) > 5:
                for i in range(0, len(orangeCoords)-5):
                    tempOrangeCoords.append(orangeCoords[i])
                for x, y in tempOrangeCoords:
                    if (self.x == x and self.y == y):
                        del(orangeCoords[:])
                        for p in self.trail:
                            self.canvas.delete(p)
                        del(self.trail[:])
                        self.reset()
        if self.x < 0 or self.x > 700 or self.y < 0 or self.y > 400:
            del(orangeCoords[:])
            for p in self.trail:
                self.canvas.delete(p)
            del(self.trail[:])
            self.reset()
            
        if inv.x < self.x and inv.x+20 > self.x and inv.y < self.y and inv.y+20 > self.y:
            self.invinsible = True
            inv.makeInvisible()
    
    def changeColor(self):  
        #Red
        if self.upRed:
            self.r+=10
            if self.r >= 255:
                self.upRed = False
                self.downRed = True
                self.upGreen = True
        if self.downRed:
            self.r-=10
            if self.r <= 0:
                self.downRed = False
        #Green        
        if self.upGreen:
            self.g+=10
            if self.g >= 255:
                self.upGreen = False
                self.downGreen = True
                self.upBlue = True
        if self.downGreen:
            self.g-=10
            if self.g <= 0:
                self.downGreen = False
        #Blue        
        if self.upBlue:
            self.b+=10
            if self.b >= 255:
                self.upBlue = False
                self.downBlue = True
                self.upRed = True
        if self.downBlue:
            self.b-=10
            if self.b <= 0:
                self.downBlue = False
                
        color = "#%02x%02x%02x" % (self.r, self.g, self.b)
        self.canvas.itemconfig(self.parts[5], fill=color)
        self.canvas.itemconfig(self.parts[6], fill=color)
        self.canvas.itemconfig(self.parts[7], fill=color)
        self.canvas.itemconfig(self.parts[8], fill=color)
        self.canvas.itemconfig(self.parts[14], fill=color)
        self.canvas.itemconfig(self.parts[15], fill=color)
        self.canvas.itemconfig(self.parts[16], fill=color)
        self.canvas.itemconfig(self.parts[17], fill=color)
        self.canvas.itemconfig(self.parts[18], fill=color)
        self.canvas.itemconfig(self.parts[19], fill=color) 
         
    def resetColor(self):
        self.canvas.itemconfig(self.parts[5], fill="orange")
        self.canvas.itemconfig(self.parts[6], fill="orange")
        self.canvas.itemconfig(self.parts[7], fill="orange")
        self.canvas.itemconfig(self.parts[8], fill="orange")
        self.canvas.itemconfig(self.parts[14], fill="orange")
        self.canvas.itemconfig(self.parts[15], fill="orange")
        self.canvas.itemconfig(self.parts[16], fill="orange")
        self.canvas.itemconfig(self.parts[17], fill="orange")
        self.canvas.itemconfig(self.parts[18], fill="orange")
        self.canvas.itemconfig(self.parts[19], fill="orange")  
                 
class game:
    #Player one keys
    def calling_W(event, self):
        playerOne.up()
    def calling_A(event, self):
        playerOne.left()
    def calling_S(event, self):
        playerOne.down()
    def calling_D(event, self):
        playerOne.right()
        
    #Player two keys    
    def calling_I(event, self):
        playerTwo.up()
    def calling_J(event, self):
        playerTwo.left()
    def calling_K(event, self):
        playerTwo.down()
    def calling_L(event, self):
        playerTwo.right()
        
    def __init__(self):
        global root
        global canvas
        global playerOne
        global playerTwo
        global inv
        global blueCoords
        global orangeCoords
        
        root = Tk()
        root.title("Rudimentary Tron")
        root.geometry("700x400")
        canvas = Tkinter.Canvas(root, bg="#333333")
        canvas.configure(width=700, height = 400)
        #Background
        self.horizontalGradientRectangle(0, 0, 700, 400, 138, 43, 226, 0, 255, 255)
        self.verticalGradientRectangle(0, 0, 700, 400, 138, 43, 226, 0, 255, 255)
        playerOne = BlueBike(canvas)
        playerTwo = OrangeBike(canvas)
        inv = Invincibility(canvas)
        blueCoords = []
        orangeCoords = []
        canvas.bind("w", self.calling_W)
        canvas.bind("a", self.calling_A)
        canvas.bind("s", self.calling_S)
        canvas.bind("d", self.calling_D)
        canvas.bind("i", self.calling_I)
        canvas.bind("j", self.calling_J)
        canvas.bind("k", self.calling_K)
        canvas.bind("l", self.calling_L)
        
        canvas.pack()
        
        root.grab_set()
        root.focus_force()
        root.lift()
        self.gameloop()
        
    def horizontalGradientRectangle(self, x0, y0, x1, y1,
                                startRed, startGreen, startBlue,
                                endRed, endGreen, endBlue):
        x = x0
        while (x <= x1):
            # fade the three color components depending on the x coordinate
            # note that integer division works fine here: why?
            red = (startRed*(x1 - x) + endRed*(x - x0)) / (x1 - x0)
            green = (startGreen*(x1 - x) + endGreen*(x - x0)) / (x1 - x0)
            blue = (startBlue*(x1 - x) + endBlue*(x - x0)) / (x1 - x0)
    
            # create a hexadecimal color representation
            color = "#%02x%02x%02x" % (red, green, blue)
            if (x%50 == 0):
                # create a colored vertical line at position x
                canvas.create_line(x, y0, x, y1, fill=color)
            x +=1
    def verticalGradientRectangle(self, x0, y0, x1, y1,
                                startRed, startGreen, startBlue,
                                endRed, endGreen, endBlue):
        y = y0
        while (y <= y1):
            # fade the three color components depending on the y coordinate
            # note that integer division works fine here: why?
            red = (startRed*(y1 - y) + endRed*(y - y0)) / (y1 - y0)
            green = (startGreen*(y1 - y) + endGreen*(y - y0)) / (y1 - y0)
            blue = (startBlue*(y1 - y) + endBlue*(y - y0)) / (y1 - y0)
    
            # create a hexadecimal color representation
            color = "#%02x%02x%02x" % (red, green, blue)
            if (y%50 == 0):
                # create a colored vertical line at position x
                canvas.create_line(x0, y, x1, y, fill=color)
            y +=1           
        
    def gameloop(self):
        blueCounter = 0
        orangeCounter = 0
        while(True):
            time.sleep(.018)
            posInvSpawn = random.randrange(0, 400)
            if posInvSpawn == 5:
                inv.changePos()
            playerOne.move(inv)
            if playerOne.invinsible:
                blueCounter+=1
                playerOne.changeColor()
            if blueCounter > 300:
                blueCounter = 0
                playerOne.invinsible = False
                playerOne.resetColor()
            playerTwo.move(inv)
            if playerTwo.invinsible:
                orangeCounter+=1
                playerTwo.changeColor()
            if orangeCounter > 300:
                orangeCounter = 0
                playerTwo.invinsible = False
                playerTwo.resetColor()
            if not inv.invisible:
                inv.changeColor()
            root.update()
            canvas.update()
            canvas.focus_set()

ObjectExample = game()
ObjectExample.gameloop()