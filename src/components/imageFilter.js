import atmosphere from "../assets/images/icons/atmosphere.webp"
import clearDay from "../assets/images/icons/clearDay.png"
import clearNight from "../assets/images/icons/clearNight.png"
import cloudyDay from "../assets/images/icons/cloudyDay.png"
import cloudyNight from "../assets/images/icons/cloudyNight.png"
import drizzle from "../assets/images/icons/drizzle.webp"
import rainDay from "../assets/images/icons/rainDay.png"
import rainNight from "../assets/images/icons/rainNight.png"
import snow from "../assets/images/icons/snow.svg"
import stormDay from "../assets/images/icons/stormDay.png"
import stormNight from "../assets/images/icons/stormNight.png"


const dayImages = [
  {name : "Atmosphere", url : atmosphere},
  {name : "Clear", url : clearDay},
  {name : "Clouds", url : cloudyDay},
  {name : "Drizzle", url : drizzle},
  {name : "Rain", url : rainDay},
  {name : "Snow", url : snow},
  {name : "Thunderstorm", url : stormDay},
]

const nightImages = [
    {name : "Atmosphere", url : atmosphere},
    {name : "Clear", url : clearNight},
    {name : "Clouds", url : cloudyNight},
    {name : "Drizzle", url : drizzle},
    {name : "Rain", url : rainNight},
    {name : "Snow", url : snow},
    {name : "Thunderstorm", url : stormNight},
]

export {dayImages, nightImages}