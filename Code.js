(function() {
	let freePackages = new Set( [
		510845, //  Waking the Glares
		510753, //  Don't Make Love
		510657, //  Crowded Blue Dot Demo
		510512, //  Brimstone Brawlers
		510396, //  V.U.R.M.A Demo
		510378, //  Dark Deception: Monsters & Mortals Demo
		510196, //  NAVYFIELD Soundtrack
		510124, //  Henchman Story Demo
		509854, //  HistoryMaker VR
		509850, //  Warrior Beneath Heaven Demo
		509847, //  Goblin Summer Camp
		509728, //  Portability Demo
		509650, //  KONSAIRI Trial Edition
		509564, //  Star Dynasties IndieCade Demo
		509525, //  FRIGID Demo
		509486, //  Stream Arenas
		509432, //  X Wars Deluxe
		509352, //  Astonishing Baseball 20 Demo
		509288, //  The ER: Patient Typhon Demo
		509264, //  赛博侦探-艾尔塔特 Demo
		508883, //  Pejes Vs Zombies
		508857, //  Special Tactics Online
		508714, //  MADNESS: Project Nexus Demo
		508606, //  EVERGLORY Demo
		508494, //  Getaway Mayhem
		508487, //  Audio Drive 2 VR
		508409, //  Wind Runners Demo
		508316, //  Kargast Demo
		508307, //  Linklight Demo
		508265, //  Genius!
		508158, //  Tribal Hunter Demo
		508138, //  Onsen Master Demo
		508114, //  Reavers of New Rome Demo
		508099, //  Transmogrify Demo
		508080, //  Moduwar Demo
		507897, //  After You Demo
		507854, //  I hope she's ok Demo
		507798, //  Noosphere - The first Chapter
		507702, //  Troupe Demo
		507668, //  Punhos de Repúdio Demo
		507443, //  The Night of Joe Demo
		507404, //  Dreamshard Demo
		507372, //  The Cubedex of Boxes and Lines Demo
		507361, //  Klaus Lee Thunder in Down Under Demo
		507301, //  Cubia Demo
		507263, //  Silence Channel (Demo)
		507257, //  Para Bellum Demo
		507202, //  Ultimate ADOM - Caverns or Chaos Demo
		507179, //  Space Mechanic Simulator Demo
		507154, //  Filmmaker Tycoon Demo
		507136, //  Survival Journals Demo
		507084, //  Knight Dice Demo
		507062, //  Buggos Demo
		507008, //  Revolution: The Spark Demo
		506990, //  Rebellion: A Rogue Souls Like Demo
		506981, //  Demonizer Demo
		506883, //  Lost Demo
		506875, //  Illness in the East Demo
		506869, //  Interlude
		506808, //  Tunnel of Doom Demo
		506797, //  Two Leaves and a bud - Tea Garden Simulator Demo
		506794, //  This Is Not Chess Demo
		506773, //  Angel at Dusk Demo
		506758, //  Last Message Demo
		506746, //  Jetscout: Mystery of the Valunians Demo
		506722, //  Firing Vibes Demo
		506713, //  B-12
		506690, //  Lost Viking - Kingdom of Women Demo
		506687, //  Zakumba Astraia: Prologue Demo
		506656, //  TCSTRIKERS2 Demo
		506653, //  Glorious Tournius Demo
		506630, //  Twilight Memoria Demo
		506582, //  Breach Wanderers Demo
		506528, //  Fast Race Game Demo
		506515, //  Battle Barn: Tactics Demo
		506512, //  In It Together Demo
		506493, //  P.I.D. Demo
		506481, //  Star Drift Evolution Demo
		506385, //  Eterna: Heroes Fall Demo
		506348, //  House Builder Demo
		506298, //  Tree House Survivors Demo
		506273, //  Skycadia Demo
		506267, //  Down in Bermuda (Demo)
		506261, //  Fighting for Justice Demo
		506248, //  Cops Kissing Each Other Demo
		506245, //  Crash the Core Demo
		506230, //  Luck be a Landlord (DEMO)
		506212, //  Poker Quest Demo
		506173, //  Haunted by Evil Demo (ENG)
		506170, //  Regrowth Demo
		506133, //  SugarWinds Demo
		506111, //  Treehouse Riddle Demo
		506108, //  Gambol
		506023, //  Two Inns at Miller's Hollow
		506022, //  Shiro Demo
		506007, //  Draft of Darkness Demo
		505989, //  Milo and the Magpies Demo
		505970, //  Domineon 2 Demo
		505915, //  HORROR TALES: The Wine Demo
	] );

	if( !location.href.startsWith( 'https://store.steampowered.com/account/licenses' ) ) {
		alert( 'Please run this on Steam\'s account licenses page.' );
		return;
	}

	[ ...document.querySelectorAll( 'a[href^="javascript:RemoveFreeLicense"]' ) ].forEach( ( element ) => {
		const match = element.href.match( /javascript:RemoveFreeLicense\( ([0-9]+), '/ );
		
		if( match !== null ) {
			freePackages.delete( parseInt( match[ 1 ], 10 ) );
		}
	} );

	freePackages = [ ...freePackages ].slice( -50 );

	let loaded = 0;
	let modal;

	const fetch = ( index ) => {
		window.jQuery.ajax( {
			url: 'https://store.steampowered.com/checkout/addfreelicense/' + freePackages[ index ],
			type: 'POST',
			dataType: 'text',
			data: {
				ajax: true,
				sessionid: window.g_sessionID,
			}
		} ).done( handleResponse ).fail( xhr => handleResponse( xhr.responseText ) );
	};

	const handleResponse = ( data ) => {
		data = JSON.parse( data );
		const code = data && data.purchaseresultdetail || 0;

		console.log( `Package ${freePackages[ loaded - 1 ]} - Result: ${code}` );

		if( code === 53 ) {
			modal.Dismiss();
			window.ShowDialog(
				'Rate limited',
				'Try again in an hour. Only 50 packages can be activated per hour.'
			);
			window.GDynamicStore.InvalidateCache();
			return;
		}

		requestNext();
	};

	const requestNext = () => {
		if( modal ) {
			modal.Dismiss();
		}

		if( loaded < freePackages.length ) {
			modal = window.ShowBlockingWaitDialog(
				'Executing…',
				`Loaded <b>${loaded}</b>/${freePackages.length}.`
			);

			fetch( loaded++ );

			return;
		}

		window.ShowDialog(
			'Done',
			'Keep in mind only 50 packages can be activated per hour.'
		);
		window.GDynamicStore.InvalidateCache();
	};

	requestNext();
}());
