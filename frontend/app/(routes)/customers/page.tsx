'use client'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useEffect, useLayoutEffect, useState } from 'react';
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { NewCustomerButton } from '@/components/newCustomerButton'
import api, { fetchData } from '../../../axiosUtility/api'

const metadata: Metadata = {
    title: 'Customers | APLus Laundry',
    description: 'Manage your customers | APLus Laundry',
}


// const Subscribeddata = [
//     { "id": 1, "fullname": "Stacy Sokale", "email": "ssokale0@unicef.org", "mobile": "931-110-1570", "status": "active", "address": "3606 Tony Crossing", "profilepic": "https://robohash.org/nihilperferendisid.png?size=50x50&set=set1" },
//     { "id": 2, "fullname": "Isabella Blaksland", "email": "iblaksland1@instagram.com", "mobile": "634-985-5906", "status": "inactive", "address": "898 Old Gate Street", "profilepic": "https://robohash.org/reprehenderitautnisi.png?size=50x50&set=set1" },
//     { "id": 3, "fullname": "Cristina Proudler", "email": "cproudler2@w3.org", "mobile": "162-201-8520", "status": "active", "address": "51033 Tomscot Pass", "profilepic": "https://robohash.org/nostrumsequiin.png?size=50x50&set=set1" },
//     { "id": 4, "fullname": "Sterne Edgecombe", "email": "sedgecombe3@icio.us", "mobile": "565-358-7859", "status": "inactive", "address": "0608 Warbler Way", "profilepic": "https://robohash.org/autatsint.png?size=50x50&set=set1" },
//     { "id": 5, "fullname": "Fredericka Pratley", "email": "fpratley4@nba.com", "mobile": "625-641-3645", "status": "inactive", "address": "56390 Beilfuss Place", "profilepic": "https://robohash.org/debitisnonautem.png?size=50x50&set=set1" },
//     { "id": 6, "fullname": "Bruis Earthfield", "email": "bearthfield5@ycombinator.com", "mobile": "612-448-5526", "status": "inactive", "address": "53 Valley Edge Terrace", "profilepic": "https://robohash.org/reiciendisautaut.png?size=50x50&set=set1" },
//     { "id": 7, "fullname": "Marti Woodrough", "email": "mwoodrough6@narod.ru", "mobile": "603-626-3002", "status": "active", "address": "88 Alpine Alley", "profilepic": "https://robohash.org/ipsumullamconsectetur.png?size=50x50&set=set1" },
//     { "id": 8, "fullname": "Georgi Grizard", "email": "ggrizard7@state.tx.us", "mobile": "117-936-5438", "status": "active", "address": "2 Bartelt Place", "profilepic": "https://robohash.org/laborumofficianesciunt.png?size=50x50&set=set1" },
//     { "id": 9, "fullname": "Nerty McQuarrie", "email": "nmcquarrie8@shop-pro.jp", "mobile": "644-427-7215", "status": "inactive", "address": "36593 Harper Point", "profilepic": "https://robohash.org/atemporibusquia.png?size=50x50&set=set1" },
//     { "id": 10, "fullname": "Carlin Argyle", "email": "cargyle9@ezinearticles.com", "mobile": "422-404-8596", "status": "active", "address": "58805 Hoepker Park", "profilepic": "https://robohash.org/estreprehenderitaut.png?size=50x50&set=set1" },
//     { "id": 11, "fullname": "Helyn Anfonsi", "email": "hanfonsia@list-manage.com", "mobile": "532-928-9331", "status": "inactive", "address": "66600 Mifflin Avenue", "profilepic": "https://robohash.org/fugiatfugaab.png?size=50x50&set=set1" },
//     { "id": 12, "fullname": "Lutero Orrell", "email": "lorrellb@51.la", "mobile": "708-587-2897", "status": "active", "address": "84296 Aberg Parkway", "profilepic": "https://robohash.org/quimodisaepe.png?size=50x50&set=set1" },
//     { "id": 13, "fullname": "Ekaterina Nyles", "email": "enylesc@printfriendly.com", "mobile": "837-154-5073", "status": "inactive", "address": "6292 Del Mar Way", "profilepic": "https://robohash.org/quamofficiaid.png?size=50x50&set=set1" },
//     { "id": 14, "fullname": "Minta Treagust", "email": "mtreagustd@typepad.com", "mobile": "813-417-9781", "status": "inactive", "address": "72697 Carpenter Trail", "profilepic": "https://robohash.org/vitaefuganeque.png?size=50x50&set=set1" },
//     { "id": 15, "fullname": "Granthem Troucher", "email": "gtrouchere@scientificamerican.com", "mobile": "708-868-0602", "status": "active", "address": "1 Novick Pass", "profilepic": "https://robohash.org/consecteturutvitae.png?size=50x50&set=set1" },
//     { "id": 16, "fullname": "Jarrod Gratrex", "email": "jgratrexf@scientificamerican.com", "mobile": "846-448-7104", "status": "active", "address": "8460 Mccormick Street", "profilepic": "https://robohash.org/doloremqueillumdebitis.png?size=50x50&set=set1" },
//     { "id": 17, "fullname": "Quincey Odgaard", "email": "qodgaardg@newsvine.com", "mobile": "402-453-7159", "status": "inactive", "address": "37112 Brickson Park Parkway", "profilepic": "https://robohash.org/omnisquodsoluta.png?size=50x50&set=set1" },
//     { "id": 18, "fullname": "Vassily Zaniolini", "email": "vzaniolinih@examiner.com", "mobile": "460-791-8829", "status": "active", "address": "52 Texas Trail", "profilepic": "https://robohash.org/velitasperioresnostrum.png?size=50x50&set=set1" },
//     { "id": 19, "fullname": "Auguste Sheddan", "email": "asheddani@sina.com.cn", "mobile": "382-414-5282", "status": "active", "address": "28311 Village Drive", "profilepic": "https://robohash.org/molestiasimpeditnecessitatibus.png?size=50x50&set=set1" },
//     { "id": 20, "fullname": "Cassey Woodard", "email": "cwoodardj@icq.com", "mobile": "627-453-7690", "status": "inactive", "address": "72 Sullivan Place", "profilepic": "https://robohash.org/expeditaquisquamcommodi.png?size=50x50&set=set1" },
//     { "id": 21, "fullname": "Winslow Folds", "email": "wfoldsk@go.com", "mobile": "352-332-1987", "status": "inactive", "address": "0877 Stone Corner Parkway", "profilepic": "https://robohash.org/quiplaceatodio.png?size=50x50&set=set1" },
//     { "id": 22, "fullname": "Yolanda Kyrkeman", "email": "ykyrkemanl@histats.com", "mobile": "128-640-3242", "status": "active", "address": "9 Rusk Drive", "profilepic": "https://robohash.org/solutadistinctioadipisci.png?size=50x50&set=set1" },
//     { "id": 23, "fullname": "Alyce Kenwell", "email": "akenwellm@desdev.cn", "mobile": "396-161-4353", "status": "active", "address": "49 Mesta Junction", "profilepic": "https://robohash.org/minusvelitnecessitatibus.png?size=50x50&set=set1" },
//     { "id": 24, "fullname": "Waly Brunnstein", "email": "wbrunnsteinn@storify.com", "mobile": "719-179-5377", "status": "active", "address": "40347 Reindahl Parkway", "profilepic": "https://robohash.org/etinquia.png?size=50x50&set=set1" },
//     { "id": 25, "fullname": "Reginald Bruno", "email": "rbrunoo@hhs.gov", "mobile": "300-799-5373", "status": "active", "address": "686 Forest Run Crossing", "profilepic": "https://robohash.org/aliquidillodolores.png?size=50x50&set=set1" },
//     { "id": 26, "fullname": "Yurik Godmer", "email": "ygodmerp@oaic.gov.au", "mobile": "905-862-9800", "status": "active", "address": "0795 Hallows Pass", "profilepic": "https://robohash.org/maioresoptioofficia.png?size=50x50&set=set1" },
//     { "id": 27, "fullname": "Cami Gierek", "email": "cgierekq@discuz.net", "mobile": "307-396-1815", "status": "inactive", "address": "204 Service Point", "profilepic": "https://robohash.org/doloribuspraesentiumsuscipit.png?size=50x50&set=set1" },
//     { "id": 28, "fullname": "Brit Colliford", "email": "bcollifordr@amazonaws.com", "mobile": "413-172-7900", "status": "inactive", "address": "5 Surrey Circle", "profilepic": "https://robohash.org/autadquis.png?size=50x50&set=set1" },
//     { "id": 29, "fullname": "Pembroke Dulake", "email": "pdulakes@princeton.edu", "mobile": "562-554-9459", "status": "inactive", "address": "0 Shasta Court", "profilepic": "https://robohash.org/rerumquiillo.png?size=50x50&set=set1" },
//     { "id": 30, "fullname": "Kelvin Pepon", "email": "kpepont@nhs.uk", "mobile": "999-165-0937", "status": "active", "address": "3 Maple Alley", "profilepic": "https://robohash.org/laboreeumitaque.png?size=50x50&set=set1" },
//     { "id": 31, "fullname": "Herbie Mountford", "email": "hmountfordu@sbwire.com", "mobile": "875-435-5175", "status": "active", "address": "77 Eagle Crest Point", "profilepic": "https://robohash.org/eosquisquamiste.png?size=50x50&set=set1" },
//     { "id": 32, "fullname": "Honoria Birtwisle", "email": "hbirtwislev@va.gov", "mobile": "734-425-8887", "status": "active", "address": "6 Portage Park", "profilepic": "https://robohash.org/eiusprovidentnecessitatibus.png?size=50x50&set=set1" },
//     { "id": 33, "fullname": "Rubetta Englefield", "email": "renglefieldw@tamu.edu", "mobile": "441-263-4883", "status": "inactive", "address": "4 Hooker Pass", "profilepic": "https://robohash.org/laudantiumautsed.png?size=50x50&set=set1" },
//     { "id": 34, "fullname": "Keven Lummasana", "email": "klummasanax@ebay.com", "mobile": "319-826-1356", "status": "inactive", "address": "49 Northfield Alley", "profilepic": "https://robohash.org/abipsumeligendi.png?size=50x50&set=set1" },
//     { "id": 35, "fullname": "Madella Roberson", "email": "mrobersony@youtube.com", "mobile": "352-880-5689", "status": "inactive", "address": "85839 Fulton Drive", "profilepic": "https://robohash.org/animirationefuga.png?size=50x50&set=set1" },
//     { "id": 36, "fullname": "Stinky Hierro", "email": "shierroz@webmd.com", "mobile": "585-272-1327", "status": "inactive", "address": "046 Lyons Parkway", "profilepic": "https://robohash.org/omnisassumendafacere.png?size=50x50&set=set1" },
//     { "id": 37, "fullname": "Blondy Bellwood", "email": "bbellwood10@seattletimes.com", "mobile": "706-392-0664", "status": "active", "address": "99677 Mallard Avenue", "profilepic": "https://robohash.org/quiaaliquidmagni.png?size=50x50&set=set1" },
//     { "id": 38, "fullname": "Babita Villa", "email": "bvilla11@spotify.com", "mobile": "523-231-4437", "status": "active", "address": "92 Gale Street", "profilepic": "https://robohash.org/blanditiisquamtempora.png?size=50x50&set=set1" },
//     { "id": 39, "fullname": "Hube Broster", "email": "hbroster12@samsung.com", "mobile": "152-578-0153", "status": "inactive", "address": "07344 Nelson Terrace", "profilepic": "https://robohash.org/autvitaeullam.png?size=50x50&set=set1" },
//     { "id": 40, "fullname": "Emera McAtamney", "email": "emcatamney13@macromedia.com", "mobile": "705-698-5411", "status": "inactive", "address": "6554 Packers Plaza", "profilepic": "https://robohash.org/maximeblanditiisat.png?size=50x50&set=set1" },
//     { "id": 41, "fullname": "Crissie Heddon", "email": "cheddon14@spotify.com", "mobile": "292-108-8559", "status": "active", "address": "589 Kensington Alley", "profilepic": "https://robohash.org/nemoitaqueet.png?size=50x50&set=set1" },
//     { "id": 42, "fullname": "Gifford Huntress", "email": "ghuntress15@alexa.com", "mobile": "247-644-0389", "status": "active", "address": "64 Washington Road", "profilepic": "https://robohash.org/beataeomnisminus.png?size=50x50&set=set1" },
//     { "id": 43, "fullname": "Meade Tite", "email": "mtite16@washingtonpost.com", "mobile": "125-896-6820", "status": "inactive", "address": "23998 Toban Plaza", "profilepic": "https://robohash.org/quosedeos.png?size=50x50&set=set1" },
//     { "id": 44, "fullname": "Baryram Fetter", "email": "bfetter17@ox.ac.uk", "mobile": "185-814-5574", "status": "active", "address": "01522 Loeprich Way", "profilepic": "https://robohash.org/temporereprehenderitcommodi.png?size=50x50&set=set1" },
//     { "id": 45, "fullname": "Alexia Timmens", "email": "atimmens18@gravatar.com", "mobile": "569-607-3724", "status": "active", "address": "4568 Eggendart Terrace", "profilepic": "https://robohash.org/doloreearumcorporis.png?size=50x50&set=set1" },
//     { "id": 46, "fullname": "Juieta Kings", "email": "jkings19@github.com", "mobile": "170-694-5198", "status": "active", "address": "048 Pawling Place", "profilepic": "https://robohash.org/quidemnatuscorporis.png?size=50x50&set=set1" },
//     { "id": 47, "fullname": "Deane Downse", "email": "ddownse1a@elegantthemes.com", "mobile": "603-277-4942", "status": "inactive", "address": "15600 Lake View Circle", "profilepic": "https://robohash.org/situtquia.png?size=50x50&set=set1" },
//     { "id": 48, "fullname": "Lyndsey Dusey", "email": "ldusey1b@cargocollective.com", "mobile": "949-667-4234", "status": "active", "address": "6618 Walton Lane", "profilepic": "https://robohash.org/providentmodirerum.png?size=50x50&set=set1" },
// ] as any[];

// const NonSubscribeddata = [
//     { "id": 49, "fullname": "Ermanno Cardoso", "email": "ecardoso1c@indiatimes.com", "mobile": "913-560-2749", "status": "inactive", "address": "1152 Cardinal Center", "profilepic": "https://robohash.org/delenitipariaturaliquam.png?size=50x50&set=set1" },
//     { "id": 50, "fullname": "Vickie Futter", "email": "vfutter1d@buzzfeed.com", "mobile": "691-778-6478", "status": "inactive", "address": "2 Corscot Trail", "profilepic": "https://robohash.org/voluptatemlaborumest.png?size=50x50&set=set1" },
//     { "id": 51, "fullname": "Richart Patrone", "email": "rpatrone1e@live.com", "mobile": "490-404-0828", "status": "inactive", "address": "4 Forest Run Court", "profilepic": "https://robohash.org/quisquamvoluptatempossimus.png?size=50x50&set=set1" },
//     { "id": 52, "fullname": "Marena Siddon", "email": "msiddon1f@irs.gov", "mobile": "942-176-0026", "status": "active", "address": "47 Manitowish Circle", "profilepic": "https://robohash.org/modicorruptiratione.png?size=50x50&set=set1" },
//     { "id": 53, "fullname": "Sylas Winny", "email": "swinny1g@accuweather.com", "mobile": "174-490-2385", "status": "inactive", "address": "23 Division Place", "profilepic": "https://robohash.org/perspiciatisearumodio.png?size=50x50&set=set1" },
//     { "id": 54, "fullname": "Bronnie Drust", "email": "bdrust1h@shop-pro.jp", "mobile": "462-437-4834", "status": "active", "address": "46 Packers Place", "profilepic": "https://robohash.org/distinctioveleos.png?size=50x50&set=set1" },
//     { "id": 55, "fullname": "Catherina Rosin", "email": "crosin1i@woothemes.com", "mobile": "999-822-5616", "status": "inactive", "address": "796 Oriole Place", "profilepic": "https://robohash.org/earumsedvoluptas.png?size=50x50&set=set1" },
//     { "id": 56, "fullname": "Loraine Lettson", "email": "llettson1j@weebly.com", "mobile": "399-749-3344", "status": "active", "address": "09570 Bartelt Point", "profilepic": "https://robohash.org/perferendissitiste.png?size=50x50&set=set1" },
//     { "id": 57, "fullname": "Carolee Andrin", "email": "candrin1k@jigsy.com", "mobile": "196-684-4987", "status": "inactive", "address": "863 Novick Pass", "profilepic": "https://robohash.org/totamvoluptasquia.png?size=50x50&set=set1" },
//     { "id": 58, "fullname": "Chelsea Cully", "email": "ccully1l@mozilla.org", "mobile": "520-635-1074", "status": "active", "address": "28023 Kensington Court", "profilepic": "https://robohash.org/velharumdolor.png?size=50x50&set=set1" },
//     { "id": 59, "fullname": "Garner Bratley", "email": "gbratley1m@digg.com", "mobile": "549-573-6604", "status": "active", "address": "0601 Pawling Junction", "profilepic": "https://robohash.org/animimagniin.png?size=50x50&set=set1" },
//     { "id": 60, "fullname": "Antonietta Edgerton", "email": "aedgerton1n@reddit.com", "mobile": "194-884-5550", "status": "active", "address": "76068 Sundown Center", "profilepic": "https://robohash.org/repudiandaecumqueut.png?size=50x50&set=set1" },
//     { "id": 61, "fullname": "Wakefield Milazzo", "email": "wmilazzo1o@noaa.gov", "mobile": "100-289-7669", "status": "inactive", "address": "4332 Monterey Terrace", "profilepic": "https://robohash.org/consequaturetofficiis.png?size=50x50&set=set1" },
//     { "id": 62, "fullname": "Tamera Matthai", "email": "tmatthai1p@csmonitor.com", "mobile": "215-747-0875", "status": "active", "address": "29 Anzinger Street", "profilepic": "https://robohash.org/necessitatibusquiaet.png?size=50x50&set=set1" },
//     { "id": 63, "fullname": "Lazarus Goldbourn", "email": "lgoldbourn1q@seattletimes.com", "mobile": "711-953-8766", "status": "inactive", "address": "9421 Manley Avenue", "profilepic": "https://robohash.org/quoatdeserunt.png?size=50x50&set=set1" },
//     { "id": 64, "fullname": "Vina Cheeld", "email": "vcheeld1r@newsvine.com", "mobile": "288-914-9638", "status": "active", "address": "98328 Pond Way", "profilepic": "https://robohash.org/ducimusetquo.png?size=50x50&set=set1" },
//     { "id": 65, "fullname": "Melodee Hurl", "email": "mhurl1s@blogs.com", "mobile": "519-586-8227", "status": "active", "address": "391 Acker Road", "profilepic": "https://robohash.org/illovoluptatevoluptatibus.png?size=50x50&set=set1" },
//     { "id": 66, "fullname": "Derrick Haquard", "email": "dhaquard1t@dyndns.org", "mobile": "535-637-2252", "status": "inactive", "address": "1342 Northport Place", "profilepic": "https://robohash.org/asperioresevenietcupiditate.png?size=50x50&set=set1" },
//     { "id": 67, "fullname": "Mira Townby", "email": "mtownby1u@wikispaces.com", "mobile": "861-431-9293", "status": "inactive", "address": "6 Johnson Circle", "profilepic": "https://robohash.org/praesentiumquosdolores.png?size=50x50&set=set1" },
//     { "id": 68, "fullname": "Joeann Itzak", "email": "jitzak1v@altervista.org", "mobile": "845-217-3504", "status": "active", "address": "3669 Golf View Center", "profilepic": "https://robohash.org/illumquisquod.png?size=50x50&set=set1" },
//     { "id": 69, "fullname": "Bartholomew Goddard", "email": "bgoddard1w@cnbc.com", "mobile": "198-539-9798", "status": "active", "address": "95970 Brentwood Avenue", "profilepic": "https://robohash.org/sintinfacilis.png?size=50x50&set=set1" },
//     { "id": 70, "fullname": "Liane Pool", "email": "lpool1x@phoca.cz", "mobile": "718-693-9313", "status": "active", "address": "87536 Anzinger Parkway", "profilepic": "https://robohash.org/maximemodieos.png?size=50x50&set=set1" },
//     { "id": 71, "fullname": "Sherwin Bomb", "email": "sbomb1y@rediff.com", "mobile": "567-784-0594", "status": "inactive", "address": "83611 Charing Cross Parkway", "profilepic": "https://robohash.org/similiqueveniamqui.png?size=50x50&set=set1" },
//     { "id": 72, "fullname": "Kirbie Mantz", "email": "kmantz1z@hexun.com", "mobile": "131-504-4571", "status": "inactive", "address": "81 Kingsford Pass", "profilepic": "https://robohash.org/cumvoluptatibusomnis.png?size=50x50&set=set1" },
//     { "id": 73, "fullname": "Murvyn Scawen", "email": "mscawen20@ebay.co.uk", "mobile": "185-952-9343", "status": "active", "address": "3383 Shelley Park", "profilepic": "https://robohash.org/asperioresaspernaturautem.png?size=50x50&set=set1" },
//     { "id": 74, "fullname": "Fiona Bonanno", "email": "fbonanno21@mac.com", "mobile": "252-778-8027", "status": "active", "address": "41600 Dakota Court", "profilepic": "https://robohash.org/facilisilloquia.png?size=50x50&set=set1" },
//     { "id": 75, "fullname": "Sal Guarnier", "email": "sguarnier22@so-net.ne.jp", "mobile": "390-957-8832", "status": "active", "address": "30 Ridge Oak Circle", "profilepic": "https://robohash.org/earumminimaatque.png?size=50x50&set=set1" },
//     { "id": 76, "fullname": "Gustavus Grimm", "email": "ggrimm23@latimes.com", "mobile": "665-870-7327", "status": "active", "address": "8 Artisan Court", "profilepic": "https://robohash.org/quicumquevoluptate.png?size=50x50&set=set1" },
//     { "id": 77, "fullname": "Jonie Gerald", "email": "jgerald24@csmonitor.com", "mobile": "413-142-8519", "status": "active", "address": "89 Rowland Pass", "profilepic": "https://robohash.org/omnisvoluptatemomnis.png?size=50x50&set=set1" },
//     { "id": 78, "fullname": "Sheffy Telezhkin", "email": "stelezhkin25@phoca.cz", "mobile": "807-249-1005", "status": "active", "address": "58601 Green Lane", "profilepic": "https://robohash.org/utomnissed.png?size=50x50&set=set1" },
//     { "id": 79, "fullname": "Drona Fleckness", "email": "dfleckness26@mashable.com", "mobile": "813-896-0404", "status": "inactive", "address": "1 Dayton Park", "profilepic": "https://robohash.org/etcumqueexpedita.png?size=50x50&set=set1" },
//     { "id": 80, "fullname": "Viole Hagard", "email": "vhagard27@businesswire.com", "mobile": "932-444-6827", "status": "inactive", "address": "1 Lien Terrace", "profilepic": "https://robohash.org/nemoveroquis.png?size=50x50&set=set1" },
//     { "id": 81, "fullname": "Tammie Marven", "email": "tmarven28@elpais.com", "mobile": "473-879-0389", "status": "active", "address": "2 Fairfield Road", "profilepic": "https://robohash.org/facilisetqui.png?size=50x50&set=set1" },
//     { "id": 82, "fullname": "Barbabra Glader", "email": "bglader29@nymag.com", "mobile": "180-894-6619", "status": "inactive", "address": "4 Shasta Pass", "profilepic": "https://robohash.org/abutenim.png?size=50x50&set=set1" },
//     { "id": 83, "fullname": "Denyse Gurney", "email": "dgurney2a@un.org", "mobile": "250-913-8923", "status": "active", "address": "8020 Aberg Pass", "profilepic": "https://robohash.org/blanditiisetveniam.png?size=50x50&set=set1" },
//     { "id": 84, "fullname": "Kylila Osmund", "email": "kosmund2b@shareasale.com", "mobile": "659-541-1170", "status": "inactive", "address": "89 Vernon Alley", "profilepic": "https://robohash.org/quamquispariatur.png?size=50x50&set=set1" },
//     { "id": 85, "fullname": "Jaclin Heersema", "email": "jheersema2c@dagondesign.com", "mobile": "592-759-8839", "status": "inactive", "address": "481 Northwestern Center", "profilepic": "https://robohash.org/nullaetharum.png?size=50x50&set=set1" },
//     { "id": 86, "fullname": "Frank Renak", "email": "frenak2d@google.nl", "mobile": "411-747-3600", "status": "inactive", "address": "92 Briar Crest Lane", "profilepic": "https://robohash.org/laborevoluptatefugit.png?size=50x50&set=set1" },
//     { "id": 87, "fullname": "Marijo Jephcott", "email": "mjephcott2e@tinypic.com", "mobile": "291-201-1005", "status": "inactive", "address": "827 Kim Crossing", "profilepic": "https://robohash.org/providentsequierror.png?size=50x50&set=set1" },
//     { "id": 88, "fullname": "Mallory Stanyland", "email": "mstanyland2f@nifty.com", "mobile": "772-676-1016", "status": "inactive", "address": "23 Amoth Place", "profilepic": "https://robohash.org/distinctioreiciendiset.png?size=50x50&set=set1" },
//     { "id": 89, "fullname": "Galvan Cannop", "email": "gcannop2g@comsenz.com", "mobile": "625-981-9916", "status": "active", "address": "9 Elmside Junction", "profilepic": "https://robohash.org/suntipsumet.png?size=50x50&set=set1" },
//     { "id": 90, "fullname": "Zaneta Ranklin", "email": "zranklin2h@cdbaby.com", "mobile": "332-154-1439", "status": "active", "address": "71 Manitowish Place", "profilepic": "https://robohash.org/ipsumducimusquas.png?size=50x50&set=set1" },
//     { "id": 91, "fullname": "Ernie Large", "email": "elarge2i@mlb.com", "mobile": "201-760-8904", "status": "active", "address": "5 Rigney Parkway", "profilepic": "https://robohash.org/quisvoluptatemqui.png?size=50x50&set=set1" },
// ] as any[];

// const AllData = [
//     ...Subscribeddata,
//     ...NonSubscribeddata
// ] as any[];

const bulkDeleteFunction = (selectedRows: any) => {
    console.log(selectedRows)
    toast.success('Deleted Successfully')
}



export default function Page() {

    const [AllData, setAllData] = useState([])
    const [Subscribeddata, setSubscribeddata] = useState([])
    const [NonSubscribeddata, setNonSubscribeddata] = useState([])

    const getData = async () => {

        try {
            const result = await fetchData('/auth/getallcustomers'); // Replace 'your-endpoint' with the actual API endpoint
            setAllData(result)
            const nonSubscribedUsers = result.filter((user: { customerType: string; }) => user.customerType === 'nonsubscriber');

            const subscribedUsers = result.filter((user: { customerType: string; }) => user.customerType === 'subscriber');

            setNonSubscribeddata(nonSubscribedUsers);
            setSubscribeddata(subscribedUsers);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between items-center">
                <div>
                    <Heading className='leading-tight' title='Customers' />
                    <p className='text-muted-foreground text-sm'>Manage Your Customers</p>
                </div>

                <NewCustomerButton />


            </div>
            <Separator orientation='horizontal' />

            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{AllData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="subscribed">Subscribed <Badge className='text-bg-primary-foreground' variant="outline"> {Subscribeddata?.length}</Badge></TabsTrigger>
                        <TabsTrigger className='gap-2' value="non-subscribed">Non-subscribed <Badge className='text-bg-primary-foreground' variant="outline">{NonSubscribeddata?.length}</Badge> </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <DataTable
                            bulkDeleteIdName='id'
                            bulkDeleteTitle='Are you sure you want to delete these customers?'
                            bulkDeleteDescription='This will delete the selected customers, and they will not be recoverable.'

                            bulkDeleteToastMessage='Selected Customers Deleted Successfully'
                            searchKey='email' columns={columns} data={AllData} />
                    </TabsContent>
                    <TabsContent value="subscribed">
                        <DataTable
                            bulkDeleteIdName='id'
                            bulkDeleteTitle='Are you sure you want to delete these customers?'
                            bulkDeleteDescription='This will delete the selected customers, and they will not be recoverable.'

                            bulkDeleteToastMessage='Selected Customers Deleted Successfully'
                            searchKey='email' columns={columns} data={Subscribeddata} />
                    </TabsContent>
                    <TabsContent value="non-subscribed">
                        <DataTable
                            bulkDeleteIdName='id'
                            bulkDeleteTitle='Are you sure you want to delete these customers?'
                            bulkDeleteDescription='This will delete the selected customers, and they will not be recoverable.'

                            bulkDeleteToastMessage='Selected Customers Deleted Successfully'
                            searchKey='email' columns={columns} data={NonSubscribeddata} />
                    </TabsContent>
                </Tabs>

            </div>

        </div>
    )
}

// export { AllData }

