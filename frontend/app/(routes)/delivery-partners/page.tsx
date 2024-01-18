'use client'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useEffect, useLayoutEffect, useState } from 'react';
import { columns } from './components/columns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import api, { fetchData } from '../../../axiosUtility/api'

// const DeliveryAgentsData = [
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
// ] as any[]

export default function Page() {

    const [DeliveryAgentsData, setDeliveryAgentsData] = useState([])
    const getData = async () => {
        try {
            const result = await fetchData('/auth/getalldeliveryagent'); // Replace 'your-endpoint' with the actual API endpoint
            console.log(result)
            setDeliveryAgentsData(result)
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
                    <Heading className='leading-tight' title='Your Delivery Agents' />
                    <p className='text-muted-foreground text-sm'>Manage Your Delivery Agents</p>
                </div>
                <Link href={'/delivery-partners/create-new'}>
                    <Button variant='default'>Create New <PlusIcon className='w-4 ml-2' /></Button>
                </Link>
            </div>

            <Separator orientation='horizontal' />
            <div className="container mx-auto py-10">
                <DataTable searchKey='email' columns={columns} data={DeliveryAgentsData} />

            </div>
        </div>
    )
}
