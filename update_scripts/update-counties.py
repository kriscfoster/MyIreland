# coding: utf-8 
from gensim.summarization import summarize
import pyrebase
import os

cavanLink = "https://www.carhire.ie/cavanbackground.php"
cavanText = "Cavan comes from the old Irish word for ‘hollow’ or ‘little hill’, " + \
	"and all a takes is a few minutes driving in the countryside to understand " + \
	"how the name was attached to this place. It’s a land of drumlins, small-scale " + \
	"hills and ridges that alternate with a spectacular network of wooded lakes. " + \
	"This is ideal country for walking, angling or simply enjoying the outdoors. " + \
	"In the ancient days of Gaelic Ireland, Cavan was part of the Bréifne kingdom, " + \
	"and it remained under the jurisdiction of the O’Reilly clan. This was long before " + \
	"anything resembling the modern-day town was in place. The O’Reillys built a castle " + \
	"in the 1200s, along with St Mary’s Abbey. The bell tower of the Abbey remains an iconic" + \
	"fixture of Cavan to this day, though the rest of the structure was lost. However, the stones" + \
	"of the friary were used to build many historic buildings that are still standing in Cavan. " + \
	"The O’Reilly clan maintained its grip on Cavan until the 1400s, when the Nine Years War saw " + \
	"English troops battling Irish clans for control of the countryside. The clans lost control of " + \
	"the region, and the English brought in Protestant settlers from Scotland to wrest power from " + \
	"those loyal to the Catholic church. This led to further uprisings and rebellions that would " + \
	"continue for centuries through to the War for Irish Independence. " + \
	"Today, Cavan is a hidden gem that many visitors are completely unaware of. Less than a 90 minute " + \
	"drive from Dublin, Cavan is an ideal weekend destination. That said, many visitors leave wishing they " + \
	"had scheduled more time in Ireland’s Lake Lands – especially during the summer months. "

monaghanLink = "https://www.monaghantourism.com/index.php/about-county-monaghan"
monaghanText = "County Monaghan takes its name from the Irish ‘Muineacháin’, meaning ‘little hills’. " + \
	"Inhabited from an early era, many relics of the Bronze Age have been unearthed throughout the county over the " + \
	"years.  It was later the centre and heartland of the kingdom of Oriel, and an ancient monument at Donaghmoyne is " + \
	"reputed to have been the residence of the Kings of Oriel. The arrival of Christianity saw St. Patrick visit " + \
	"several locations in the county, while his ‘right-hand man’ – St. Macartan became patron of the diocese of which " + \
	"County Monaghan forms approximately one half.  Tiernach of Clones and Dympna of Tydavnet later became two of " + \
	"Ireland’s best known saints. The Vikings were invaders during the 10-11th centuries and a Viking fort is still " + \
	"visible near Glaslough, while a later Norman motte and bailey stands at Donaghmoyne.  Prior to the 17th century " + \
	"Plantation,s County Monaghan was ruled by the McMahons who controlled four fifths of its area, and the McKennas " + \
	"who controlled the remaining one fifth. When the Elizabethans decided in 1585 to divide Ulster into ‘shire-land’," + \
	"the boundaries of the county were laid out, roughly the same as todays, but it was not until the first decade of " + \
	"the 17th century that the county was officially formed and named. From the 15th to 17th centuries the McMahons and " + \
	"the McKennas formed part of the armies of the O’Neills and were a constant thorn in the side of the English, whose " + \
	"territory ‘The Pale’, just touched the southern end of the present county. In the Nine Years War (1595-1603) the " + \
	"first major battle was fought at Clontibret while the McMahon/McKenna combination also figured in later battles and " + \
	"in the defeat at Kinsale in 1601. Mountjoy’s forces pursued them following that defeat and destroyed many of their " + \
	"fortifications. Elections were always keenly contested in the county, none more so than in 1826 when, on the " + \
	"instigation of Daniel O’Connell, Westenra was elected by the Catholic voters as a pro-Emancipation candidate and " + \
	"again in 1833 when Parnell addressed huge meetings at Castleblayney, Monaghan, Emyvale and Scotstown in support " + \
	"of Tim Healy, who then became the first ever nationalist MP for the county. The Monaghan of today is a county " + \
	"with strong links to its historical past and many towns and villages retain and portray a history and " + \
	"tradition of times long past. There are heritage trails in Monaghan, Clones and Carrickmacross and many sites " + \
	"of historical interest including Edergole Court Tomb, Mannan Castle Motte and Bailey, Inniskeen Round Tower " + \
	"and Lisnadarragh Wedge Tomb."

louthLink = "http://www.irishabroad.com/travel/ireland/midlands/louth/"
louthText = "Situated half way between the two biggest cities in Ireland, Belfast and Dublin, lies the smallest " + \
	"county in Ireland, Louth. The 'Wee County' as it is affectionately known to the Irish is beautifully situated "+\
	"on the North East coats of the island with its long, beautiful beaches stretching away from the towering "+ \
	"Mountains of Mourne to the North. Carlingford Lough is one of Ireland's most famous lakes with breathtaking "+ \
	"scenery stretching even to the Isle of Man across the Irish Sea. The rugged mountains that tower over the town " + \
	"provide splendid country for hill walking and cater to those in search of the perfect view. Nearby, situated along " + \
	"the Lough is the Tain Holiday Village a 10-acre site with all sorts of water and adventure activities for the whole " + \
	"family and a wide choice of accommodation. From Carlingford one can strike out along the 40 km Tain Way bringing " + \
	"the visitor though the wild and romantic Cooley Peninsula. But if shopping or something more relaxing is what you're " + \
	"after Louth's two biggest towns, Drogheda and Dundalk can see to your needs. One of Ireland's oldest ands most "+ \
	"historical towns Drogheda traces its history back to 1194. Drogheda is associated with an extraordinary number of " + \
	"significant events in the history of Ireland - The Battle of the Boyne, St Oliver Plunkett, Poynings Law, Cromwell's " + \
	"Siege and the surrender of the Irish Chieftains to the English King. These days though the town is far more relaxed and " + \
	"the pleasant streets of Drogheda are home to many fine bars and restaurants. Ardee and Dundalk provide alternative bases " + \
	"from which to explore the county but whichever one a guest choose he or she can be assured of a warm reception. Louth's " + \
	"unique situation between the two biggest cities in Ireland has bred a tradition of hospitality into the very ground. The " + \
	"war and friendly atmosphere will be unmistakable wherever you go in the county. With its mix of the modern and the mythic, " + \
	"the urban and the unusual Louth becomes more and more attractive to visitors with each passing year. Convenient to the big " + \
	"cities and with accommodation to suit every budget a visit is highly recommended."

meathLink = "https://www.tripsavvy.com/county-meath-and-newgrange-1542094"
meathText = "The Irish name of County Meath is Contae na Mhí, the literal (and rather unexciting) meaning being 'The Middle'. " + \
	"Together with County Westmeath, County Meath once formed the 'Fifth Province of Ireland, the one politically " + \
	"in the middle of things. Cars registered in County Meath will have the letters MH on their number plates. " + \
	"The county town is Navan, other important towns include Ashbourne, Dunboyne, Dunshaughlin, Kells, Oldcastle, and Trim. " + \
	"Especially those towns near to the Dublin border have grown immensely during the boom years, housing commuters " + \
	"more than anything else. Meath has a size of 2,338 square kilometers. According to the 2011 census, 184,135 " + \
	"people live here - since 1991, the population of County Meath grew by 75%, this is the highest population growth " + \
	"in Ireland and mainly due to Dublin 'expanding'. The most common county nickname is 'Royal Meath', after the " + \
	"former seat of the Irish High Kings on the Hill of Tara. With the 1690 battle site Boyne river, Meath has " + \
	"the most important 'pilgrimage site' for Unionists. Meath is not only the 'Royal County', but chock-a-block with " + \
	"historic and majestic sites. Pride of place must, however, go to Bru na Bóinne, which provides a very informative " + \
	"visitor center and a gateway to the passage tombs of Newgrange and Knowth. Access to both is by guided tour only and " + \
	"all start at the visitor center (which is well sign-posted, but actually on the other side of the river). The reconstruction " + \
	"of the mound at Newgrange might be debatable, but impressive it is. If you want to get away from the (in summer often) " + \
	"maddening crowd, make your own way to Dowth - the third major mound of the Bru na Bóinne complex, freely accessible, not " + \
	"restored and often left in solitary peace. Maybe second in fame only to Newgrange, the Hill of Tara is more a general " + \
	"feeling of antiquity than a tangible sight. When you come here, you'll see something akin to a not-very-well-kept golf " + \
	"course or rough-ish landscape park. Only with a guidebook and some imagination will you be able to explore the hidden " + \
	"wonders of this sprawling complex. The audio- visual show in the visitor center helps a lot, walking the Hill of Tara " + \
	"with an open mind and a bit of time will (maybe) open up its mysteries to you. Those tourists jumping from the bus, " + \
	"checking off their list and having a quick gander will not get the most from this site. Personally, we recommend cold, " + \
	"crisp winter mornings around sunrise - if you can live with the sheep droppings. Tayto Park is a 'theme park' in County Meath " + \
	"and geared at families with children, though the selection of animals on view makes it interesting for adults too. " + \
	"It is very good for a day out with the family, quite good if you visit without kids and are not on the lookout for " + \
	"peace and quiet. The focus is on physical activity and a learning experience, a very welcome change from passive " + \
	"entertainment. This is a top destination if you need to keep the kids amused in the greater Dublin area " + \
	"and the weather is with you."

westmeathLink = "http://www.rootsireland.ie/about-westmeath/"
westmeathText = "County Westmeath is sometimes referred to as “The Lake County” due to the abundance of lakes, " + \
	"streams and other waterways in the county. This inland county is part of the midlands and is in the province " + \
	"of Leinster. County Westmeath has a long and colourful history that predates its official charter. It is said " + \
	"that this was the meeting place of the five ancient provinces of Ireland. Prior to the arrival of St. Patrick, " + \
	"the county was the gathering place for the High Kings of Ireland. The Normans arrived about 1170 and built " + \
	"many castles and forts. The county was officially established in 1543 and was named after the historic kingdom " + \
	"of Mide. The county was centrally involved in the 1641 rebellion and was active in the Williamite wars. Most of " + \
	"the Irish or Norman landholders lost their land following the 1641 rebellion. Throughout the county you will " + \
	"find remarkable evidence of the region’s long and colourful past. Uisneagh Hill is an impressive hill nearly 180 " + \
	"meters tall. It is here that King Tuathal Teachmar erected his palace in the early second century. For two hundred " + \
	"years the pagan kings of Ireland ruled. There are many castles located within the county. Perhaps the most famous " + \
	"is Tullynally. This castle, which is still lived in by the family of the Earl of Longford, is a beautiful castle " + \
	"that is nearly a quarter of a mile long. One of the oldest Castles in Westmeath is Delvin Castle, built in 1181 by " + \
	"Hugh De Lacy. Athlone Castle was built in 1210 for King John of England. It was strategically placed to guard one " + \
	"of the main crossings of the River Shannon. Crookedwood Fort is one of the oldest structures in the county. It is " + \
	"related to the old Stories of Fionn, the mythological hunter and warrior or the Druids. Nearby at Taughmon is a " + \
	"fourteenth century fortified stone church. Many of the towns located within the county have their own distinct " + \
	"histories. The town of Fore is a medieval town containing a large moat from Anglo-Norman times. There are remnants " + \
	"of the ancient city walls and a Benedictine Monastery that was in use until Henry VIII closed it in 1539. The monastery " + \
	"contains superior ancient artwork and crosses. The population of Westmeath in 1841 was 141,300. During the Great Famine " + \
	"of 1845-1847, the population decreased until it was 111,407 in 1851. The population continued to decrease to 56,818 in " + \
	"1926. In 2011, the population was 86,164."

donegalLink = "http://www.donegallanguageschool.com/glimpse-bundoran/"
donegalText = "Donegal often called the “forgotten county?” is one of Ireland’s most beautiful counties. " + \
	"We have put together some interesting facts for anyone visiting the area. Donegal is situated in the " + \
	"north-west of Ireland and is surrounded by 5 counties including Sligo, Leitrim, Derry, Tyrone and Fermanagh " + \
	"making it a perfect platform to explore some hidden beauties. The County has six hundred and fifty kilometres " + \
	"of rugged coastline and sandy beaches to explore. Tory Island off of Donegal has a King. This is a unique " + \
	"tradition that does not exist anywhere else in Ireland. The current Rí Thoraí (Irish for King of Tory) is painter " + \
	"Patsaí Dan Mac Ruaidhrí (Patsy Dan Rodgers in English). The king has no formal powers; though duties include " + \
	"being a spokesperson for the island community and welcoming people to the island. The total population of the " + \
	"Island is under 200. Donegal has the second-largest Gaeltacht(where Irish is the first language) area in the " + \
	"whole of Ireland. Some famous people that have hailed from Donegal include the world famour singer Enya, the " + \
	"renowned trad group Clannad, country and western crooner Daniel O Donnnell, rock legend Rory Gallagher and for " + \
	"those of literary interest the poet William Allingham. All in all Donegal is a great place to visit while " + \
	"on holidays in Ireland."

leitrimLink = "https://www.irishcentral.com/roots/county-leitrim-87161507-237773921"
leitrimText = "In ancient times Leitrim formed the western half of the Kingdom of Breifne, which " + \
	"from 1256 onwards was ruled over by the O’Rourke family. The O’Rourke’s heraldic symbol of the lion still has a " + \
	"presence in Leitrim’s official crest. Normans invaded in the 13th century and occupied the southern portion of " + \
	"the kingdom, though the O’Rourkes more or less maintained control through the 16th century, when modern day Leitrim " + \
	"was carved out of the ancient Kingdom of Breifne. The county suffered a number of rough blows in the mid-1800s. " +\
	"First, there was a recession caused by the mechanization of linen weaving (one of the county’s prime exports) in " + \
	"the 1830's. Then the Great Famine saw Leitrim's population of 155,000 (as of the 1841 census) plummet to 112,000 " + \
	"by 1851. In addition to the linen industry, Leitrim was also noted for its coal mining and mining of iron ore. " + \
	"The county’s last coal mine remained open until 1990 and now functions as a visitor center, the Arigna Mining " + \
	"Experience. Key attractions: Though Leitrim is the smallest of Connacht’s five counties in both size and population " + \
	"(and the least populous of Ireland’s 32 counties), it should not be underestimated. Leitrim has many wonderful " + \
	"attractions and sights to behold. Leitrim has a dramatic hilly and mountainous landscape in its northwest and is " + \
	"relatively flat in the southeast. Lough Allen divides the middle of the county. It is an unspoiled, tranquil area " + \
	"of great natural beauty, consisting of lofty mountains, deep valleys, pastures, lakes, rolling hills and rivers. " + \
	"The extreme northwest Leitrim has a short Atlantic coastline (3 mi) between Sligo and Donegal. Carrick-on-Shannon, " + \
	"Leitrim’s county town, offers stunning views of the Shannon, fun nightlife and culture, and plenty of history with the " + \
	"Carrick Castle, Hatley Manor, and a workhouse and famine graveyard. The Carrick-on-Shannon Rowing Club has been in " + \
	"existence since 1827. Each August the town plays host to the annual August Holiday regatta. In addition to the Arigna " + \
	"Mining Experience, visitors may also learn about Leitrim’s industrial history at the Sliabh na Iarainn Visitor Center, " + \
	"which offers exhibitions and interactive learning experiences about the trade activity between the two mountain regions. " + \
	"The 50-feet-high Glencar Waterfall in Glencar Lough was a source of inspiration to William Butler Yeats. The surrounding " + \
	"area offers many peaceful and scenic walks and picnic spots. Glencar Waterfall in Glencar Lough was a source of " + \
	"inspiration to William Butler Yeats."

cavanSumarry = summarize(cavanText, ratio = 0.5)
monaghanSummary = summarize(monaghanText, ratio = 0.5)
louthSummary = summarize(louthText, ratio = 0.5)
meathSummary = summarize(meathText, ratio = 0.5)
westmeathSummary = summarize(westmeathText, ratio = 0.5)
donegalSummary = summarize(donegalText, ratio = 0.7)
leitrimSummary = summarize(leitrimText, ratio=0.5)

counties = {
	"cavan": {
		"link": cavanLink, 
		"summary": cavanSumarry 
	},
	"monaghan": {
		"link": monaghanLink,
		"summary": monaghanSummary
	}
}


config = {
  "apiKey": os.environ['FB_API_KEY'],
  "authDomain": os.environ['FB_AUTH_DOMAIN'],
  "databaseURL": os.environ['FB_DATABASE_URL'],
  "storageBucket": os.environ['FB_STORAGE_BUCKET']
 }

firebase = pyrebase.initialize_app(config)
db = firebase.database()


db.child("counties").set(counties)



