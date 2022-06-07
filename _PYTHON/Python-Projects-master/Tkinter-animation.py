import Tkinter
from Tkinter import *
import time
import inspect
import os
from PIL import Image, ImageTk
import random
class game_one:# basically, the start of the Holy Grail
    def __init__(self):# global means that this variable is available
        # everywhere in the program; aka, globally
        global root # very basic, main window into which everything must go
        global canvas_one# also very basic, area of root which we draw on
        global armV1
        global armV2
        global armOne
        global armTwo
        global rainDrops
        global cycleCounter
        global sun
        global window
        
        global stemSide1
        global stemTop1
        global ball1
        global connectingLine
        global stemSide2
        global ball2
        global stemSide3
        global ball3
        armV1 = -1
        armV2 = 1
        cycleCounter = 0
        raindrops = []
        root = Tk() #Tkinter creates an actual root (above is only a variable)
        root.title("Sing us a Song Mister Piano Man")#puts a title on the root window
        canvas_one = Tkinter.Canvas(root, bg="#e6e6e6")# changeable back color
        canvas_one.pack()#packs everything into the drawing window
        canvas_one.focus_set() #allows keyboard events
        
        #BACKGROUND
        #floor = canvas_one.create_rectangle(0, 400, 1000, 800, fill = "#926239")
        self.verticalGradientRectangle(0, 400, 1000, 800, 106, 58, 17, 146, 98, 57)
        wall = canvas_one.create_rectangle(0, 0, 1000, 400, fill = "#ffffe0")
        
        #RUG
        rugLayerOne = canvas_one.create_polygon(200, 400, 700, 400, 800, 600, 100, 600, fill = "#0038A8")
        rugLayerTwo = canvas_one.create_polygon(240, 400, 660, 400, 720, 550, 180, 550, fill = "white")
        rugLayerThree = canvas_one.create_polygon(280, 400, 620, 400, 655, 510, 245, 510, fill = "#0038A8")
        rugLayerFour = canvas_one.create_polygon(320, 400, 580, 400, 600, 480, 300, 480, fill = "white")
        
        #BENCH
        benchTop = canvas_one.create_polygon(250, 400, 260, 380, 260, 400, fill = "black")
        benchSide = canvas_one.create_rectangle(250, 400, 300, 420, fill = "black")
        benchLegOne = canvas_one.create_rectangle(250, 420, 260, 450, fill = "black")
        benchLegTwo = canvas_one.create_rectangle(290, 420, 300, 450, fill = "black")
        benchAccentOne = canvas_one.create_rectangle(250, 445, 260, 450, fill = "gray")
        benchAccentTwo = canvas_one.create_rectangle(290, 445, 300, 450, fill = "gray")
        
        #PIANO MAN
        legTop = canvas_one.create_polygon(260, 380, 310, 380, 320, 390, 320, 400, 260, 400, fill = "black")
        legBottom = canvas_one.create_rectangle(305, 400, 320, 450, fill = "black")
        torso = canvas_one.create_polygon(265, 330, 285, 330, 290, 350, 290, 380, 260, 380, 260, 350, fill = "black")
        foot = canvas_one.create_polygon(320, 440, 325, 440, 333, 443, 335, 451, 320, 451, fill = "black")
        neck = canvas_one.create_polygon(270, 320, 285, 320, 282, 330, 267, 330, fill = "tan")
        head = canvas_one.create_polygon(260, 300, 265, 290, 280, 285, 290, 290, 293, 300, 291, 302, 298, 312, 292, 314, 290, 320, 285, 325, 270, 325, 265, 315, fill = "tan")
        hair = canvas_one.create_polygon(257, 300, 262, 325, 267, 320, 265, 315, 275, 310, 280, 300, 295, 290, 290, 285, 275, 280, 265, 285, fill = "brown")
        armOne = canvas_one.create_line(290, 355, 350, 350, fill = "black", width = 10)
        armTwo = canvas_one.create_line(290, 355, 350, 350, fill = "black", width = 10)
        
        #PIANO
        legOne = canvas_one.create_polygon(372, 395, 388, 385, 383, 450, 377, 450, fill = "black")
        legTwo = canvas_one.create_polygon(382, 385, 398, 370, 393, 435, 387, 435, fill = "black")
        legThree = canvas_one.create_polygon(490, 380, 500, 380, 498, 440, 492, 440, fill = "black")
        keyPiece = canvas_one.create_rectangle(330, 355, 360, 379, fill = "black")
        keyPieceTwo = canvas_one.create_polygon(355, 355, 360, 330, 360, 355, fill = "black")
        upperLegOne = canvas_one.create_polygon(350, 380, 410, 380, 410, 385, 390, 395, 370, 395, 350, 385, fill = "black")
        upperLegTwo = canvas_one.create_polygon(485, 380, 505, 380, 500, 395, 490, 395, fill = "black")
        self.horizontalGradientRectangle(360, 330, 460, 380, 0, 0, 0, 100, 100, 100)
        self.horizontalGradientRectangle(460, 330, 520, 380, 100, 100, 100, 0, 0, 0)
        lidPieceOne = canvas_one.create_rectangle(400, 280, 480, 330, fill = "#323232", outline = "#323232")
        lidPieceTwo = canvas_one.create_oval(420, 280, 520, 330, fill = "#323232", outline = "#323232")
        lidPieceThree = canvas_one.create_rectangle(400, 250, 460, 280, fill = "#323232", outline = "#323232")
        lidProp = canvas_one.create_rectangle(410, 260, 415, 330, fill = "black")
        
        #WINDOW
        frame = canvas_one.create_rectangle(600, 150, 850, 275, fill = "white")
        window = canvas_one.create_rectangle(615, 165, 835, 260, fill = "#778899")
        sun = canvas_one.create_oval(640, 180, 690, 230, fill = "#778899", outline = "#778899")
        #barOne = canvas_one.create_rectangle(720, 165, 730, 260, fill = "white")
        #barTwo = canvas_one.create_rectangle(615, 206, 835, 216, fill = "white")
        
        #MUSICAL NOTES
        stemSide1 = canvas_one.create_rectangle(500, 380, 510, 430, fill = "black")
        stemTop1 = canvas_one.create_rectangle(500, 380, 530, 390, fill = "black")
        ball1 = canvas_one.create_oval(490, 420, 510, 440, fill = "black")
        stemSide2 = canvas_one.create_rectangle(400, 280, 410, 330, fill = "black")
        ball2 = canvas_one.create_oval(390, 310, 410, 330, fill = "black")
        connectingLine = canvas_one.create_line(405, 285, 430, 275, width = 10)
        stemSide3 = canvas_one.create_rectangle(425, 270, 435, 320, fill = "black")
        ball3 = canvas_one.create_oval(415, 300, 435, 320, fill = "black")
        
        #LAMP
        self.radialGradientRectangle(10, 190, 200, 380, 255, 255, 224, 255, 255, 0)
        self.horizontalGradientRectangle(85, 315, 115, 350, 92, 92, 92, 192, 192, 192)
        shade = canvas_one.create_polygon(80, 270, 120, 270, 130, 310, 70, 310, fill = "white", outline = "black")
        stalk = canvas_one.create_rectangle(95, 310, 105, 315, fill = "#c0c0c0")
        
        #TABLE
        tableTop = canvas_one.create_rectangle(50, 350, 150, 390, fill = "#cd853f")
        tableDrawer = canvas_one.create_rectangle(60, 360, 140, 380, fill = "#cd853f")
        tableKnob1 = canvas_one.create_oval(95, 365, 105, 375, fill = "#fafad2")
        tableLeg1 = canvas_one.create_rectangle(55, 390, 70, 430, fill = "#cd853f")
        tableLeg2 = canvas_one.create_rectangle(130, 390, 145, 430, fill = "#cd853f")        
        
        
        root.grab_set()#I forget what this does. Don't change it.
        root.lift()#This makes root appear in front of the other applications
        self.gameloop_one() #starts the game loop, see below       
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
    
            # create a colored vertical line at position x
            canvas_one.create_line(x, y0, x, y1, fill=color)
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

            # create a colored horizontal line at position y
            canvas_one.create_line(x0, y, x1, y, fill=color)
            y +=1
    def radialGradientRectangle(self, x0, y0, x1, y1,
                            startRed, startGreen, startBlue,
                            endRed, endGreen, endBlue):
        # we need the x, y ratio to compute y given x
        xyRatio = float(x1 - x0) / float(y1 - y0)
        width = x1 - x0
        height = y1 - y0
        xMiddle = (x0 + x1) / 2
        x = x0
        y = y0
        while (x <= xMiddle): # we need to loop only half way through the rectangle
            # fade the three color components depending on the distance
            # from the center
            red = (startRed*(xMiddle - x) + endRed*(x - x0)) / (xMiddle - x0)
            green = (startGreen*(xMiddle - x) + endGreen*(x - x0)) / (xMiddle - x0)
            blue = (startBlue*(xMiddle - x) + endBlue*(x - x0)) / (xMiddle - x0)
    
            # create a hexadecimal color representation
            color = "#%02x%02x%02x" % (red, green, blue)
            
            # create a colored rectangle
            canvas_one.create_rectangle(x, y, x+width, y+height, fill=color, outline=color)
            x += 1
            y += 1.0 / xyRatio
            width -= 2
            height -= 2.0 / xyRatio
    def gameloop_one(self):#game loop
        armV1 = -(random.randrange(1, 4))
        armV2 = random.randrange(1, 4)
        rainDrops = []
        rainDropListLen = 100
        cycleCounter = 0
        R1 = 135
        G1 = 135
        B1 = 135
        R2 = 135
        G2 = 135
        B2 = 135
        rain = True
        sunny = False
        for i in range (1, 51):
            rainX = random.randrange(615, 830)
            rainY = random.randrange(165, 255)
            rainDrops.append(canvas_one.create_oval(rainX, rainY, rainX+5, rainY+5, fill = "cyan"))
        print "Beginning Gameloop..."# blurb-level feedback, can delete this
        while(True):#sacred, basic game loop
            time.sleep(.04)# sacred, slows the process to a human speed
            coordsOne = canvas_one.coords(armOne)
            coordsTwo = canvas_one.coords(armTwo)
            cycleCounter += 1
            if coordsOne[3] <= 340 or coordsOne[3] >= 360:
                armV1 *= -1
            if coordsTwo[3] <= 340 or coordsTwo[3] >= 360:
                armV2 *= -1
            if cycleCounter == 230:
                sunny = True
                rain = False
            if cycleCounter == 430:
                sunny = False
                rain = True 
                for i in rainDrops:
                    rainX = random.randrange(615, 830)
                    rainY = random.randrange(165, 255)
                    canvas_one.coords(i, rainX, rainX+5, rainY, rainY + 5)
                cycleCounter = -30
            if(sunny == True):
                if(cycleCounter == 230):
                    R1 = 135
                    G1 = 135
                    B1 = 135
                    R2 = 135
                    G2 = 135
                    B2 = 135
                if(R1 < 255):
                    R1 += 5
                    G1 += 5
                    B1 -= 5
                if(B2 < 255):
                    B2 += 5
                    R2 -= 5
                    G2 += 2
                color1 = "#%02x%02x%02x" % (R1, G1, B1)
                color2 = "#%02x%02x%02x" % (R2, G2, B2)
                canvas_one.itemconfig(sun, fill= color1)
                canvas_one.itemconfig(window, fill= color2)
                
            canvas_one.coords(armOne, coordsOne[0], coordsOne[1], coordsOne[2], coordsOne[3] + armV1)
            canvas_one.coords(armTwo, coordsTwo[0], coordsTwo[1], coordsTwo[2], coordsTwo[3] + armV2)
            note1xV = random.randrange(3, 10)
            note1yV = -(random.randrange(3, 10))
            note2xV = random.randrange(3, 10)
            note2yV = -(random.randrange(3, 10))

            canvas_one.move(stemSide1, note1xV, note1yV)
            canvas_one.move(stemTop1, note1xV, note1yV)
            canvas_one.move(ball1, note1xV, note1yV)
            canvas_one.move(stemSide2, note2xV, note2yV)
            canvas_one.move(ball2, note2xV, note2yV)
            canvas_one.move(connectingLine, note2xV, note2yV)
            canvas_one.move(stemSide3, note2xV, note2yV)
            canvas_one.move(ball3, note2xV, note2yV)
            
            note1Coords = canvas_one.coords(ball1)
            note2Coords = canvas_one.coords(ball2)
            if(note1Coords[3] < 0):
                canvas_one.coords(ball1, 490, 320, 510, 340)
                canvas_one.coords(stemSide1, 500, 280, 510, 330)
                canvas_one.coords(stemTop1, 500, 280, 530, 290)
            if(note2Coords[3] < 0):
                canvas_one.coords(stemSide2, 400, 280, 410, 330)
                canvas_one.coords(ball2, 390, 310, 410, 330)
                canvas_one.coords(connectingLine, 405, 285, 430, 275)
                canvas_one.coords(stemSide3, 425, 270, 435, 320)
                canvas_one.coords(ball3, 415, 300, 435, 320)
            
            if(rain == True):
                if(cycleCounter < 0):
                    if(cycleCounter == -30):
                        R1 = 255
                        G1 = 255
                        B1 = 15
                        R2 = 15
                        G2 = 183
                        B2 = 255
                    if(R1 > 135):
                        R1 -= 5
                        G1 -= 5
                        B1 += 5
                    if(B2 > 135):
                        B2 -= 5
                        R2 += 5
                        G2 -= 2
                    color1 = "#%02x%02x%02x" % (R1, G1, B1)
                    color2 = "#%02x%02x%02x" % (R2, G2, B2)
                    canvas_one.itemconfig(sun, fill= color1)
                    canvas_one.itemconfig(window, fill= color2)
                for i in rainDrops:
                    canvas_one.move(i, 1, 4)
                    coords = canvas_one.coords(i)
                    if coords[2] > 835 or coords[3] >260:
                        if cycleCounter > 200:
                            canvas_one.coords(i, 1001, 1001, 1001, 1001)
                        else:
                            newX = random.randrange(615, 830)
                            if(newX <= 625):
                                newY = random.randrange(165, 255)
                            else:
                                newY = 165
                            canvas_one.coords(i, newX, newY, newX+5, newY+5)
            root.update() # flushes out the old root window
            canvas_one.update()# puts the new canvas on the root window
ObjectExample = game_one()# starts the animation