import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { columns } from './components/columns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function page() {
    const Subscribeddata = [
        { "id": 1, "fullname": "Erasmus Dood", "email": "edood0@webmd.com", "mobile": "111-455-4205", "status": "inactive", "address": "91 Superior Hill" },
        { "id": 2, "fullname": "Byrle Antoniades", "email": "bantoniades1@imdb.com", "mobile": "244-753-5851", "status": "inactive", "address": "92262 Sage Way" },
        { "id": 3, "fullname": "Mycah Skuse", "email": "mskuse2@seattletimes.com", "mobile": "397-527-0533", "status": "inactive", "address": "98355 Bonner Lane" },
        { "id": 4, "fullname": "Amie Mathivat", "email": "amathivat3@statcounter.com", "mobile": "289-700-3837", "status": "active", "address": "722 Raven Street" },
        { "id": 5, "fullname": "Blayne Cordell", "email": "bcordell4@usda.gov", "mobile": "272-670-0868", "status": "inactive", "address": "62 Arrowood Alley" },
        { "id": 6, "fullname": "Alfredo Joreau", "email": "ajoreau5@wordpress.com", "mobile": "925-412-6594", "status": "inactive", "address": "8751 Walton Trail" },
        { "id": 7, "fullname": "Felice Conor", "email": "fconor6@pinterest.com", "mobile": "883-837-5103", "status": "inactive", "address": "224 Duke Point" },
        { "id": 8, "fullname": "Marys Mousby", "email": "mmousby7@loc.gov", "mobile": "651-449-1160", "status": "active", "address": "82 Main Pass" },
        { "id": 9, "fullname": "Ted Bench", "email": "tbench8@wikispaces.com", "mobile": "756-564-6861", "status": "active", "address": "32 Lyons Place" },
        { "id": 10, "fullname": "Dalenna Bayns", "email": "dbayns9@smh.com.au", "mobile": "871-453-4019", "status": "active", "address": "20 Oak Valley Way" },
        { "id": 11, "fullname": "Jsandye Desantis", "email": "jdesantisa@acquirethisname.com", "mobile": "305-931-7169", "status": "inactive", "address": "4 Kennedy Court" },
        { "id": 12, "fullname": "Judon Roofe", "email": "jroofeb@springer.com", "mobile": "890-123-1226", "status": "inactive", "address": "091 Moose Place" },
        { "id": 13, "fullname": "Chev Yurocjhin", "email": "cyurocjhinc@seattletimes.com", "mobile": "948-566-5379", "status": "inactive", "address": "96 Anderson Lane" },
        { "id": 14, "fullname": "Mikey Davidovsky", "email": "mdavidovskyd@oaic.gov.au", "mobile": "585-102-2206", "status": "active", "address": "3036 Aberg Point" },
        { "id": 15, "fullname": "Rickie Kinkade", "email": "rkinkadee@bluehost.com", "mobile": "112-836-0751", "status": "inactive", "address": "4 Declaration Junction" },
        { "id": 16, "fullname": "Stormy Temby", "email": "stembyf@berkeley.edu", "mobile": "767-986-0537", "status": "active", "address": "02427 Hermina Lane" },
        { "id": 17, "fullname": "Kirsteni Jozwicki", "email": "kjozwickig@ning.com", "mobile": "682-514-5453", "status": "inactive", "address": "610 Thackeray Terrace" },
        { "id": 18, "fullname": "Marion Partleton", "email": "mpartletonh@tumblr.com", "mobile": "935-946-3366", "status": "active", "address": "21267 Oak Valley Circle" },
        { "id": 19, "fullname": "Carola Moulsdale", "email": "cmoulsdalei@yahoo.co.jp", "mobile": "162-906-4588", "status": "inactive", "address": "10 Springview Trail" },
        { "id": 20, "fullname": "Katee Hanfrey", "email": "khanfreyj@gnu.org", "mobile": "492-654-6261", "status": "inactive", "address": "36 Caliangt Center" },
        { "id": 21, "fullname": "Johannah Bilbey", "email": "jbilbeyk@nhs.uk", "mobile": "868-201-3163", "status": "inactive", "address": "146 Columbus Plaza" },
        { "id": 22, "fullname": "Darill Divine", "email": "ddivinel@ustream.tv", "mobile": "216-523-3028", "status": "inactive", "address": "478 Farragut Hill" },
        { "id": 23, "fullname": "Sibylla Stiant", "email": "sstiantm@ask.com", "mobile": "178-173-0038", "status": "inactive", "address": "2 Mcguire Park" },
        { "id": 24, "fullname": "Bessie MacPaike", "email": "bmacpaiken@infoseek.co.jp", "mobile": "340-453-4015", "status": "inactive", "address": "183 Meadow Vale Pass" },
        { "id": 25, "fullname": "Therine Meert", "email": "tmeerto@ucsd.edu", "mobile": "389-525-5799", "status": "active", "address": "82457 Gale Circle" },
        { "id": 26, "fullname": "Misti Boustred", "email": "mboustredp@dedecms.com", "mobile": "403-293-4647", "status": "active", "address": "05965 Randy Plaza" },
        { "id": 27, "fullname": "Marji Harbar", "email": "mharbarq@tumblr.com", "mobile": "847-777-8659", "status": "active", "address": "93479 Fieldstone Street" },
        { "id": 28, "fullname": "Sisile Libbey", "email": "slibbeyr@t.co", "mobile": "859-983-1687", "status": "active", "address": "9414 Del Sol Place" },
        { "id": 29, "fullname": "Josefa Chatelet", "email": "jchatelets@delicious.com", "mobile": "494-384-9852", "status": "inactive", "address": "7330 Muir Place" },
        { "id": 30, "fullname": "Chantalle Pollastrino", "email": "cpollastrinot@washingtonpost.com", "mobile": "243-347-7230", "status": "inactive", "address": "7 Scoville Street" },

        // ...
    ];

    const NonSubscribeddata = [
        { "id": 31, "fullname": "Laverne Grindley", "email": "lgrindleyu@fema.gov", "mobile": "597-294-1274", "status": "active", "address": "731 Ilene Hill" },
        { "id": 32, "fullname": "Farleigh Bartoletti", "email": "fbartolettiv@hc360.com", "mobile": "324-376-4447", "status": "active", "address": "228 Michigan Road" },
        { "id": 33, "fullname": "Sheilakathryn Coverly", "email": "scoverlyw@yahoo.com", "mobile": "636-370-6317", "status": "active", "address": "29 Donald Terrace" },
        { "id": 34, "fullname": "Leeann Mildmott", "email": "lmildmottx@instagram.com", "mobile": "259-463-9244", "status": "inactive", "address": "437 Superior Drive" },
        { "id": 35, "fullname": "Norrie Macewan", "email": "nmacewany@tumblr.com", "mobile": "378-424-3847", "status": "inactive", "address": "0 Chive Terrace" },
        { "id": 36, "fullname": "Gale Waller", "email": "gwallerz@newyorker.com", "mobile": "589-195-9551", "status": "active", "address": "10692 Cody Park" },
        { "id": 37, "fullname": "Nate Wogdon", "email": "nwogdon10@oakley.com", "mobile": "458-415-6355", "status": "active", "address": "29 Lindbergh Lane" },
        { "id": 38, "fullname": "Kevina Courtman", "email": "kcourtman11@thetimes.co.uk", "mobile": "121-968-8068", "status": "active", "address": "9 Orin Way" },
        { "id": 39, "fullname": "Nicolas Solomonides", "email": "nsolomonides12@bizjournals.com", "mobile": "191-274-2835", "status": "inactive", "address": "83 Walton Junction" },
        { "id": 40, "fullname": "Florencia Bissell", "email": "fbissell13@tmall.com", "mobile": "726-111-4048", "status": "inactive", "address": "063 Fisk Road" },
        { "id": 41, "fullname": "Evangelia Wilbud", "email": "ewilbud14@nba.com", "mobile": "608-283-9486", "status": "inactive", "address": "1816 Declaration Alley" },
        { "id": 42, "fullname": "Adore MacLaren", "email": "amaclaren15@ucoz.ru", "mobile": "463-174-2483", "status": "active", "address": "3649 Dapin Park" },
        { "id": 43, "fullname": "Othilia Dyter", "email": "odyter16@diigo.com", "mobile": "635-104-8384", "status": "inactive", "address": "88 Mcbride Park" },
        { "id": 44, "fullname": "Johannah Glendzer", "email": "jglendzer17@discovery.com", "mobile": "909-869-1895", "status": "inactive", "address": "998 Fremont Place" },
        { "id": 45, "fullname": "Alfy De Vuyst", "email": "ade18@quantcast.com", "mobile": "822-310-1342", "status": "inactive", "address": "488 Carey Lane" },
        { "id": 46, "fullname": "Harald Francescoccio", "email": "hfrancescoccio19@ftc.gov", "mobile": "819-474-8340", "status": "active", "address": "9 Heffernan Court" },
        { "id": 47, "fullname": "Chancey Cutajar", "email": "ccutajar1a@flickr.com", "mobile": "317-625-1340", "status": "active", "address": "3 Schlimgen Court" },
        { "id": 48, "fullname": "Nehemiah Tybalt", "email": "ntybalt1b@rakuten.co.jp", "mobile": "722-897-6783", "status": "active", "address": "52 Fieldstone Street" },
        { "id": 49, "fullname": "Mercedes Paff", "email": "mpaff1c@g.co", "mobile": "213-395-9182", "status": "active", "address": "71824 Ridgeview Junction" },
        { "id": 50, "fullname": "Eddi Bereford", "email": "ebereford1d@dyndns.org", "mobile": "382-596-0910", "status": "inactive", "address": "60 Maryland Trail" },
        { "id": 51, "fullname": "Gill Wiffler", "email": "gwiffler1e@delicious.com", "mobile": "124-490-5853", "status": "inactive", "address": "1 Summerview Crossing" },
        { "id": 52, "fullname": "Nicola Aldhous", "email": "naldhous1f@uol.com.br", "mobile": "822-385-9163", "status": "active", "address": "59 Rigney Place" },
        { "id": 53, "fullname": "Allayne Flaonier", "email": "aflaonier1g@example.com", "mobile": "186-824-6772", "status": "inactive", "address": "9 Prairie Rose Park" },
        { "id": 54, "fullname": "Findlay MacComiskey", "email": "fmaccomiskey1h@tripadvisor.com", "mobile": "472-362-2010", "status": "active", "address": "9 Katie Court" },
        { "id": 55, "fullname": "Zach Eastcourt", "email": "zeastcourt1i@ft.com", "mobile": "857-901-4644", "status": "active", "address": "0 Pawling Court" },
        { "id": 56, "fullname": "Dag Fellis", "email": "dfellis1j@last.fm", "mobile": "342-817-7624", "status": "inactive", "address": "9057 Manley Court" },
        { "id": 57, "fullname": "Jackie Wilcox", "email": "jwilcox1k@shop-pro.jp", "mobile": "602-684-1659", "status": "inactive", "address": "9582 Stuart Court" },
        { "id": 58, "fullname": "Arleta Pickervance", "email": "apickervance1l@technorati.com", "mobile": "314-651-0770", "status": "inactive", "address": "38 Westerfield Terrace" },
        { "id": 59, "fullname": "Jervis Lamcken", "email": "jlamcken1m@symantec.com", "mobile": "492-966-5264", "status": "active", "address": "79179 Ohio Crossing" },
        { "id": 60, "fullname": "Beitris Greenwood", "email": "bgreenwood1n@goo.gl", "mobile": "604-107-2776", "status": "active", "address": "3 David Drive" },
        { "id": 61, "fullname": "Lin Sreenan", "email": "lsreenan1o@constantcontact.com", "mobile": "280-569-4995", "status": "active", "address": "7036 Di Loreto Avenue" },
        { "id": 62, "fullname": "Kayne Nabarro", "email": "knabarro1p@purevolume.com", "mobile": "558-678-6292", "status": "inactive", "address": "7 David Junction" },
        { "id": 63, "fullname": "Druci Allom", "email": "dallom1q@behance.net", "mobile": "591-692-4057", "status": "active", "address": "40 Meadow Valley Drive" },
        { "id": 64, "fullname": "Valaria Stutely", "email": "vstutely1r@artisteer.com", "mobile": "764-979-7949", "status": "active", "address": "3819 Sage Trail" },
        { "id": 65, "fullname": "Farrel Guppey", "email": "fguppey1s@scribd.com", "mobile": "655-944-0570", "status": "active", "address": "60635 Eastlawn Lane" },
        { "id": 66, "fullname": "Adair Galsworthy", "email": "agalsworthy1t@dedecms.com", "mobile": "625-415-0045", "status": "active", "address": "5 Barby Pass" },
        { "id": 67, "fullname": "Ardelis Alexsandrowicz", "email": "aalexsandrowicz1u@kickstarter.com", "mobile": "829-643-0129", "status": "inactive", "address": "2099 Mallory Hill" },
        { "id": 68, "fullname": "Honoria Ridout", "email": "hridout1v@twitter.com", "mobile": "307-764-0673", "status": "active", "address": "95 New Castle Drive" },
        { "id": 69, "fullname": "Henderson Proger", "email": "hproger1w@wordpress.org", "mobile": "471-722-6173", "status": "inactive", "address": "3239 Homewood Avenue" },
    ]

    const AllData = [
        ...Subscribeddata,
        ...NonSubscribeddata
    ]

    return (
        <div className='w-full space-y-2 h-full flex p-6 flex-col'>
            <div className="topbar w-full flex justify-between">
                <div>
                    <Heading className='leading-tight' title='Customers' />
                    <p className='text-muted-foreground text-sm'>Manage Your Customers</p>
                </div>
            </div>
            <Separator orientation='horizontal' />
            <div>

            </div>
            <div className="container mx-auto py-10">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='gap-3'>
                        <TabsTrigger className='gap-2' value="all">All <Badge className='text-bg-primary-foreground ' variant="outline">{AllData?.length}</Badge> </TabsTrigger>
                        <TabsTrigger className='gap-2' value="subscribed">Subscribed <Badge className='text-bg-primary-foreground' variant="outline"> {Subscribeddata?.length}</Badge></TabsTrigger>
                        <TabsTrigger className='gap-2' value="non-subscribed">Non-subscribed <Badge className='text-bg-primary-foreground' variant="outline">{NonSubscribeddata?.length}</Badge> </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <DataTable searchKey='email' columns={columns} data={AllData} />
                    </TabsContent>
                    <TabsContent value="subscribed">
                        <DataTable searchKey='email' columns={columns} data={Subscribeddata} />
                    </TabsContent>
                    <TabsContent value="non-subscribed">
                        <DataTable searchKey='email' columns={columns} data={NonSubscribeddata} />

                    </TabsContent>
                </Tabs>

            </div>

        </div>
    )
}
