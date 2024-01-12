const qrcode = require('qrcode-terminal');

const { Client ,LocalAuth ,MessageMedia } = require('whatsapp-web.js');


const allsessionobject = {}
const client = new Client({
    puppeteer:{
        headless:false
    },
    authStrategy : new LocalAuth({
        clientId:"YOUR_CLIENT_ID"
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});




client.on('ready', () => {
    console.log('Client is ready!');
});


client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});


client.on('message', async message =>{
    if(message.body === "hello" || message.body === "Hello" || message.body === "HELLO" || message.body === "hi" ||  message.body === "Hi" ||  message.body === "hii" ){
       await message.reply("hello my name is nikki from abhiwaran how can i help you");
    } else if(message.body === 'url'){
        
        const media = await MessageMedia.fromUrl("https://images.unsplash.com/photo-1609805620003-2a785a3b8a56?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww", { unsafeMime: true })

        const chat = await message.getChat()
        chat.sendMessage(media);
    }

    else if(message.body === 'local'){
        const media = await MessageMedia.fromFilePath("bird.jpg");
        const chat = await message.getChat();
        chat.sendMessage(media);
    }

    
    
    
    else if(message.body === "audio"){
       
        
        try {

            const media = await MessageMedia.fromFilePath("song.mp3")
            
            const chat = await message.getChat()
             chat.sendMessage( media, {
                sendAudioAsVoice: true, 
                caption: 'Here is the audio file!',
                mimetype: 'audio/mp3', 
                ptt: false 
            });
        } catch (error) {
            console.error('Error reading audio file:', error);
        }
    }
})

client.on('disconnected', (reason) => {
    console.error('Disconnected:', reason);
});


client.initialize();
 