# A Voice Controlled Notes App Using The Speech Recognition Api And React

This little app was built with React, Webpack, The Web Speech Recognition Api, and session ~~local~~ storage. I also use Babel 7 for Js compilation and Jest for testing.

`It only works in Google Chrome`. There is also a `repeat bug` in `mobile Google Chrome`. When you `speak` your note, it repeats at least once and then on save, the repeat(s) is saved as well. In addition, `interimResults` does not render on `Google Chrome mobile`. I will be investigating this further. So for now, this app is best used on desktop, and not on mobile.

I also have to figure out how to connect my desktop to my Google Pixel 2 so that one can access downloads made in mobile on desktop. I have achieved this for another application via iPhone, so it is possible. The question is how to do it between a Google Pixel 2 and a Macbook Pro!

## How to Use:

+ Go the the application page (hosted by gh-pages): [Voice Controlled Notes App](https://interglobalmedia.github.io/speech-to-text-app/).

+ Press the blue, round **Start Recognition** button to allow microphone access and to get started with your first note.

+ After you have clicked on the button, start talking/dictating your first note. As you speak, you will see your words print out to the cadet blue bordered div. The `interim (first)` draft appears in the `div` with the `placeholder text` `Interim draft goes here`. The `Final draft goes here` appears in the div with the `placeholder text` `Final draft goes here`. 

+ What does `interim` mean in `Speech Recognition` terms? It refers to the `interimResults` property of the Api. Interim results are results that are not yet final. That means that the Api might interpret a word in one way at first and then correct itself and replace it with another.

+ What does `final` mean in `Speech Recognition` terms? It is the result that is printed to the `final draft div` after `interimResults` are exhausted. Sometimes it might take a second or two for the `interimResults` to `migrate` to the `finalResults`, so make sure that the migration is complete before clicking the `Save Note` button. If you click the `Save Note` button too soon, you might note save the ***whole*** note.

+ When you want to end your note, `click` on the `blue` button again to end your voice recording, and then click on the `Save Note` button. This will `save` your `new note` to `session storage` AND `print it` to the page.

+ There is more than one way to go after the previous step. You can either:

 + Decide to continue creating new notes and not worrying about refreshing the page (not a worry) 

 + `Stop altogether` (if even just for the moment) after you have made your last save, in which case you can `click` the `Refresh` button if you like. This will clear the page of all your notes, but it will NOT remove them.

+ After you have hit the `Refresh` button, you can click the `Get Storage` button and all your `saved notes` will render to the page.

+ If you decide that you are done for the day/session, you can download those notes and work on them on your local desktop, or you can choose to REMOVE THEM ALL from `session storage`. If you do decide to download your notes, they will `not remain in storage`. The data only persists during the session. Downloading your notes just ensures that you have an (editable) backup copy for your records.

### Downloading Notes To The Desktop

All you need to do is click the `Download` **button**, and you will see a `session-storage.txt` file being downloaded to your desktop. You can continue editing your notes directly in the text file if you like, or simply keep what you have without modifications. When you save your notes to the `session-storage.txt` file, your notes will not remain in session storage after the session is over. You can also **click** the `Clear Storage` **button** to ***remove*** them forever ***before*** the session ends.

### Removing All Your Notes From Session Storage

All you need to do is click the `Clear Storage` button and all the notes you have created will be removed from session storage. You can confirm this by clicking the `Get Storage` button. If the removal was successful, nothing should print to the page.

### The Stop Listening Voice Command

If you want to stop your recording with a `voice command` instead of by the click of a button, you can simply say `Stop Listening`, and you will end your voice session. The voice command can be a bit temperamental sometimes, especially if there is a lot of noise around you, but it is fun to try out and use!

Have fun experimenting with this little app, and I hope you will enjoy it!
