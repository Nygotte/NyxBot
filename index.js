//import

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    processTime,
} = require('@adiwajshing/baileys')

// Load JS file
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')

// Load Npm Packages
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')
const cd = 4.32e+7
const crypto = require('crypto')
const qrcode = require("qrcode-terminal")
const axios = require('axios')
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const webp = require('webp-converter');
const express = require('express');
const app = express();

//load json
const samih = JSON.parse(fs.readFileSync('./database/simi.json'))
const option = JSON.parse(fs.readFileSync('./options/option.json'))

let { spawn } = require('child_process')
let path = require('path')
const CFonts  = require('cfonts')

const {
    botName,
    ownerName,
    ownerNumber,
    pix
} = option

// Load Menu File
const { help } = require('./database/menu/help')
const { criador } = require('./database/menu/criador')
const { faq } = require('./database/menu/faq')
const { pix_txt } = require('./database/menu/pix')

prefix = '$'
finish = 'Finalizado...'

// funções 

async function starts() {
    
    CFonts.say('Nyx', {
    font: 'block',
    align: 'center',
    gradient: ['green', 'magenta']
    })
    CFonts.say('Bot', {
    font: 'block',
    align: 'center',
    gradient: ['green', 'magenta']
    })
    CFonts.say('Por @ny.lucax', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
    })
    CFonts.say('---------------------------- LOGS ----------------------------', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
    })
    
	const client = new WAConnection()
	client.logger.level = 'warn'
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Leia o codigo qr acima no seu whatsapp para conectar'))
	})
	
	fs.existsSync('./database/auth.json') && client.loadAuthInfo('./database/auth.json')
	client.on('connecting', () => {
		start('2', 'Estabelecendo conexão...')
	})
	client.on('open', () => {
		success('2', 'Conexão bem sucedida!')
		client.sendMessage('558781394948@s.whatsapp.net', '[ Nyx ] Conexão restabelecida! ', MessageType.text)
		
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./database/auth.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
        
	// ping

			app.get("/", (request, response) => {
  
				const ping = new Date();
				ping.setHours(ping.getHours() - 3);
				client.setStatus(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`)
				response.sendStatus(200);
			
			});
			app.listen(process.env.PORT); 

	client.on('chat-update', async m => {
	
		try {

          if (!m.hasNewMessage) return
            m = m.messages.all()[0]
			if (!m.message) return
			if (m.key && m.key.remoteJid == 'status@broadcast') return
			m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
			const typei = Object.keys(m.message)[0]
			if (m.key.fromMe) return
			global.prefix
			const content = JSON.stringify(m.message)
			const from = m.key.remoteJid
			const type = Object.keys(m.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = moment.tz('Asia/Jakarta').format('DD/MM/YY')
			const body = (type === 'listResponseMessage' && m.message.listResponseMessage.title) ? m.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && m.message.conversation.startsWith(prefix)) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption.startsWith(prefix) ? m.message.imageMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption.startsWith(prefix) ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : ""
			const budy = (type === 'conversation') ? m.message.conversation : (type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
			const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
            const q = args.join(' ')
			const isGroup = from.endsWith('@g.us')
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const sender = isGroup ? m.participant : m.key.remoteJid
			const isSimi = isGroup ? samih.includes(from) : false
			const getNumber = sender.split('@')[0]
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isVideo = (type === 'videoMessage')
			const isImage = (type === 'imageMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : getNumber
			
			const reply = (teks) => {
				client.sendMessage(from, teks, text)
			}
			
			
			
            //Comandos
			switch(command) { 
				
				case '':
					
					if (!isGroup && isMedia) {
						
						if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
						
						const savedFilename = media = await client.downloadAndSaveMediaMessage(m, `./${getNumber}`)
						client.sendMessage(from, 'Iniciando Requisição... ', text)

            			const result = webp.cwebp(`./${media}`,`${getNumber}.webp`,"-q 80",logging="-v");

            			result.then((response) => {
              
              				client.sendMessage(from, { url: getNumber + ".webp" }, sticker, {quoted: { key: { fromMe: true, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})

              				try {
										
								fs.unlinkSync(getNumber + ".jpeg");

							} catch (error) {

							}

            			});
								
					}

					if ((isMedia && m.message.videoMessage.seconds > 9 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 9) && args.length == 0) {
								
	reply('Indentificamos que o tamanho do vídeo requisitado é muito grande, mande no máximo um vídeo de nove segundos para que possamos reconhecê-lo!')
								
					}else if ((isMedia && m.message.videoMessage.seconds < 10 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 10) && args.length == 0) {
								
						const media = await client.downloadAndSaveMediaMessage(m, getNumber)

        				savewebp = (`${getNumber}.webp`)

						client.sendMessage(from, 'Iniciando requisição... ', text)
						client.sendMessage(from, 'Esse processo costuma demora, por favor tenha paciência.\nEnquanto isso, visite nosso Instagram: https://www.instagram.com/nyxbot_/', text)

    						ffmpeg(media)
    						.outputOption(`-vcodec`, `libwebp`, `-vf`, `scale=320:320,setsar=1,fps=15`, `-preset`, `default`, `-an`, `-vsync`, `0`)
    						.save(savewebp).on('error', function (err) {
									
								console.log(`Error : ${err}`)
								try {
											
									fs.unlinkSync(getNumber + ".mp4" );
									
								} catch (error) {
									reply("😵 Calma aí, não consigo processar tudo isso ao mesmo tempo, vamos com calma!")
								}
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply("‼️ Ocorreu um erro ao converter.")
									
							})
							.on('end', function () {

								client.sendMessage(from, { url: getNumber + ".webp" }, sticker, {quoted: { key: { fromMe: true, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})

								try {
											
									fs.unlinkSync(getNumber + ".mp4" );
									
								} catch (error) {
									reply("😵 Calma aí, não consigo processar tudo isso ao mesmo tempo, vamos com calma!")
								}

                			});	
                
						}
						break
						
					}
					else {
					
						if (!isGroup) {

							async function runSample(projectId = 'nyxbot-juvp') {
								
								const sessionId = uuid.v4();
								const sessionClient = new dialogflow.SessionsClient({
						
									keyFilename: "./database/DialogFlow.json"
						
								});

								const sessionPath = sessionClient.projectAgentSessionPath(

									projectId,
									sessionId

								);
								
								const request = {
									session: sessionPath,
									queryInput: {
										text: {
											text: `${budy}`,
											languageCode: 'pt-BR',
										},
									},
								};

								const responses = await sessionClient.detectIntent(request);
								const result = responses[0].queryResult;
					
								reply(`${result.fulfillmentText}`) 
					
					
								if (result.intent) {
						
									} else {

										console.log(' No intent matched.');

									}
								} 
								runSample() 
								break

						}
					}
					
					break

				case 'ajuda':
                case 'help':
                
					const buttons = [
						{buttonId: '$ajuda', buttonText: {displayText: "❔AJUDA"}, type: 1},
						{buttonId: '$adesivo', buttonText: {displayText: "🌃 ADESIVOS "}, type: 1},
						{buttonId: '$nextpage', buttonText: {displayText: "⏭️ PRÓXIMA PÁGINA "}, type: 1}
					]
					
					const ajuda = {
						
						contentText: `Estou aqui para facilitar a criação de adesivos para WhatsApp, sem precisar de sair do próprio WhatsApp!\n\nConsigo atuar em grupos ou em conversas privadas!\n\nE além de conseguir fazer os adesivos convencionais, também sou capaz de fazer adesivos animados.\n\nPara começar, basta clicar em algumas das seguintes opções:`,
						footerText: 'Não consegue ver os botões? Mande $notas',
    					buttons: buttons,
    					headerType: 1
    
					}
					client.sendMessage(from, ajuda, MessageType.buttonsMessage) 
					
				break

				case 'nextpage':
				
					const buttons1 = [
						{buttonId: '$faq', buttonText: {displayText: "📃PERGUNTAS FREQUENTES"}, type: 1},
						{buttonId: '$doação', buttonText: {displayText: "💰 DOAÇÕES "}, type: 1},
						{buttonId: '$info', buttonText: {displayText: "📄 INFORMAÇÕES "}, type: 1}
					]

					const nextpage = {
						contentText: `Estou aqui para facilitar a criação de adesivos para WhatsApp, sem precisar de sair do próprio WhatsApp!\n\nConsigo atuar em grupos ou em conversas privadas!\n\nE além de conseguir fazer os adesivos convencionais, também sou capaz de fazer adesivos animados.\n\nPara começar, basta clicar em ajuda e escolher algumas dos seguintes opções:`,
						footerText: 'Não consegue ver os botões? Mande $notas',
    					buttons: buttons1,
    					headerType: 1
					}
					client.sendMessage(from, nextpage, MessageType.buttonsMessage) 
					
				break

				case 'notas':
				
					client.sendMessage(from, { url: 'database/media/help.jpg' }, MessageType.image, {caption: help(pushname, prefix, botName, ownerName)})
				
				break
				
				case 'info':

					const doacoes = [
						{buttonId: '$doação', buttonText: {displayText: "💰 DOAÇÕES "}, type: 1},
					]
					
					const sendDoacoes = {
						
						contentText: `${criador(pushname, botName, ownerName)}`,
    					buttons: doacoes,
    					headerType: 1
    
					}
					client.sendMessage(from, sendDoacoes, MessageType.buttonsMessage) 

               	break
                
                case 'nyx':
                
					if (getNumber == ownerNumber) { 
					
						client.updatePresence(from, Presence.composing) 
					
						if (args.length < 1) return reply('[ ! ] sem argumentos definidos! ') 
					
						anu = await client.chats.all()
					
						for (let _ of anu) {
						
								sendMess(_.jid, `*[AVISO]*\n\n${body.slice(4)}`)
					
							}
							reply('Aviso enviado para todos os usuários!')
							break
					
					} else {
						
						client.sendMessage(sender, 'Você executou ($nyx) esse comando requer acesso de super usuário para ser executado!', text)
						break 
					} 
               
                case 'latencia': 
                
                	const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.updatePresence(from, Presence.composing) 
				    uptime = process.uptime()
                    client.sendMessage(from, `Latência: ${latensi.toFixed(4)}ms.`, text)
                    break
                       
				case 'faq':
				
					client.sendMessage(from, faq(pushname), text)
					break
				
				case 'doação':
					
					client.sendMessage(from, pix_txt(pushname, botName, ownerName), text)
					client.sendMessage(from, 'Chave Aleatória:' , text)
					client.sendMessage(from, `${pix}` , text)
					break
					
				case 'sticker':
				case 'adesivo':

					if (!isGroup) {

						reply(`Olá ${pushname}\n\nVocê sabia que em conversas privadas não precisa adicionar ($sticker) na descrição da mídia?\n\nBasta você enviar apenas a mídia que Imediatamente iremos reconhecer sua requisição!`)
						
					}

					if (!isMedia) {
						
						client.sendMessage(from, `Olá ${pushname}!\n\nEstá tentando criar um adesivo?\n\nEstamos com um novo sistema de adesivos, em chats privados você pode apenas enviar a imagem, vídeo ou gif, que iremos processar sua requisição imediatamente.\n\nJá em grupos, você deve adicionar $sticker ou $adesivos na legenda do arquivo para que possamos reconhecer sua requisição.` , text)
					} 
					
					if ((isMedia && !m.message.videoMessage || isQuotedImage) && args.length == 0) {
						
						const savedFilename = media = await client.downloadAndSaveMediaMessage(m, `./${getNumber}`)
						client.sendMessage(from, 'Iniciando Requisição... ', text)

            			const result = webp.cwebp(`./${media}`,`${getNumber}.webp`,"-q 80",logging="-v");

            			result.then((response) => {
              
              				client.sendMessage(from, { url: getNumber + ".webp" }, sticker, {quoted: { key: { fromMe: true, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})

              				try {
										
								fs.unlinkSync(getNumber + ".jpeg");

							} catch (error) {
								reply("😵 Calma aí, não consigo processar tudo isso ao mesmo tempo, vamos com calma!")
							}

            			});
								
					}

					if ((isMedia && m.message.videoMessage.seconds > 9 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds > 9) && args.length == 0) {
								
						reply('Indentificamos que o tamanho do vídeo requisitado é muito grande, mande no máximo um vídeo de nove segundos para que possamos reconhecê-lo!')
								
					}else if ((isMedia && m.message.videoMessage.seconds < 10 || isQuotedVideo && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 10) && args.length == 0) {
								
						const media = await client.downloadAndSaveMediaMessage(m, getNumber)

        				savewebp = (`${getNumber}.webp`)

						client.sendMessage(from, 'Iniciando requisição... ', text)
						client.sendMessage(from, 'Esse processo costuma demora, por favor tenha paciência.\nEnquanto isso, visite nosso Instagram: https://www.instagram.com/nyxbot_/', text)

    						ffmpeg(media)
    						.outputOption(`-vcodec`, `libwebp`, `-vf`, `scale=320:320,setsar=1,fps=15`, `-preset`, `default`, `-an`, `-vsync`, `0`)
    						.save(savewebp).on('error', function (err) {
									
								console.log(`Error : ${err}`)
								try {
											
									fs.unlinkSync(getNumber + ".mp4" );
									
								} catch (error) {
									reply("😵 Calma aí, não consigo processar tudo isso ao mesmo tempo, vamos com calma!")
								}
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply("‼️ Ocorreu um erro ao converter.")
									
							})
							.on('end', function () {

								client.sendMessage(from, { url: getNumber + ".webp" }, sticker, {quoted: { key: { fromMe: true, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${finish}` }}})

								try {
											
									fs.unlinkSync(getNumber + ".mp4" );
									
								} catch (error) {
									
									reply("😵 Calma aí, não consigo processar tudo isso ao mesmo tempo, vamos com calma!")
									
								}

                			});	
                
						}
						break
						
				default:
					if (isGroup && isSimi && budy != undefined) {
						
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					}
            }
            
		} catch (e) {
			
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()