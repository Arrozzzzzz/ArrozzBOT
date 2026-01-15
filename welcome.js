// =========================
// ArrozBOT - Sistema de Bienvenidas (versión corregida)
// =========================

const { EmbedBuilder, ChannelType } = require("discord.js");

const WELCOME_CHANNEL_ID = "1411540114253025443"; // Canal de bienvenidas
const RULES_CHANNEL_ID = "1424762145006030858";
const ROLES_CHANNEL_ID = "1424216259133968475";

module.exports = (client) => {
    client.on("guildMemberAdd", async (member) => {
        try {
            console.log(`[Welcome] Nuevo miembro detectado: ${member.user.tag}`);

            // Intentar obtener el canal correctamente
            let channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

            // Si no está en caché, intentar obtenerlo con fetch
            if (!channel) {
                channel = await member.guild.channels.fetch(WELCOME_CHANNEL_ID).catch(() => null);
            }

            // Verificar que sea un canal de texto válido
            if (!channel || channel.type !== ChannelType.GuildText) {
                console.error(`[Welcome] El canal con ID ${WELCOME_CHANNEL_ID} no es de texto o no existe.`);
                return;
            }

            // Crear embed de bienvenida
            const embed = new EmbedBuilder()
                .setColor("#FFFF00") // amarillo
                .setTitle(`¡Bienvenid@ ${member.user.username}! ✨`)
                .setDescription(
                    `Por favor, pasa a leer <#${RULES_CHANNEL_ID}> 📜 y visita <#${ROLES_CHANNEL_ID}> 🎭 para obtener tus roles.\n\n` +
                    `¡Esperamos que disfrutes tu estancia en el servidor! 🌈`
                )
                .setImage("https://images-ext-1.discordapp.net/external/bsFp7Sz8E_DZ1jbdzEdi8gUt5CUgm5bdvjnER_w4z-Y/%3Fsize%3D2048/https/cdn.discordapp.com/icons/1410008681004662858/ec9c2a23c185b8caab051bf0172e8b50.png?format=webp&quality=lossless&width=274&height=274")
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({
                    text: "secta de los arrozeros",
                    iconURL: member.guild.iconURL({ dynamic: true })
                });

            // Enviar mensaje
            await channel.send({
                content: `✨ ${member} ha ingresado al servidor`,
                embeds: [embed],
            });

            console.log(`[Welcome] Mensaje enviado correctamente en ${channel.name}`);
        } catch (error) {
            console.error("Error al enviar mensaje de bienvenida:", error);
        }
    });
};
