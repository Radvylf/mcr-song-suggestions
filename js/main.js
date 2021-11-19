window.onload = async () => {
    var find_input = document.getElementById("find_input");
    var find_songs = document.getElementById("find_songs");
    var find_no_songs = document.getElementById("find_no_songs");
    
    var known = document.getElementById("known_songs");
    var known_no_songs = document.getElementById("known_no_songs");
    
    var suggestions = document.getElementById("suggestions_songs");
    var suggestions_no_songs = document.getElementById("suggestions_no_songs");
    
    const counts_url = "https://gist.githubusercontent.com/RedwolfPrograms/abf9d3e7e1c9a03af6ee1ffdbcb620cb/raw/mcr.json";
    
    const songs = [
        [0, "Romance", "I Brought You My Bullets, You Brought Me Your Love"],
        [1, "Honey, This Mirror Isn't Big Enough for the Two of Us", "I Brought You My Bullets, You Brought Me Your Love"],
        [2, "Vampires Will Never Hurt You", "I Brought You My Bullets, You Brought Me Your Love"],
        [3, "Drowning Lessons", "I Brought You My Bullets, You Brought Me Your Love"],
        [4, "Our Lady of Sorrows", "I Brought You My Bullets, You Brought Me Your Love"],
        [5, "Headfirst for Halos", "I Brought You My Bullets, You Brought Me Your Love"],
        [6, "Skylines and Turnstiles", "I Brought You My Bullets, You Brought Me Your Love"],
        [7, "Early Sunsets Over Monroeville", "I Brought You My Bullets, You Brought Me Your Love"],
        [8, "This Is the Best Day Ever", "I Brought You My Bullets, You Brought Me Your Love"],
        [9, "Cubicles", "I Brought You My Bullets, You Brought Me Your Love"],
        [10, "Demolition Lovers", "I Brought You My Bullets, You Brought Me Your Love"],
        [11, "Helena", "Three Cheers for Sweet Revenge"],
        [12, "Give 'Em Hell, Kid", "Three Cheers for Sweet Revenge"],
        [13, "To the End", "Three Cheers for Sweet Revenge"],
        [14, "You Know What They Do to Guys Like Us in Prison", "Three Cheers for Sweet Revenge"],
        [15, "I'm Not Okay (I Promise)", "Three Cheers for Sweet Revenge"],
        [16, "The Ghost of You", "Three Cheers for Sweet Revenge"],
        [17, "The Jetset Life Is Gonna Kill You", "Three Cheers for Sweet Revenge"],
        [18, "Interlude", "Three Cheers for Sweet Revenge"],
        [19, "Thank You for the Venom", "Three Cheers for Sweet Revenge"],
        [20, "Hang 'Em High", "Three Cheers for Sweet Revenge"],
        [21, "It's Not a Fashion Statement, It's a Deathwish", "Three Cheers for Sweet Revenge"],
        [22, "Cemetery Drive", "Three Cheers for Sweet Revenge"],
        [23, "I Never Told You What I Do for a Living", "Three Cheers for Sweet Revenge"],
        [24, "The End", "The Black Parade"],
        [25, "Dead!", "The Black Parade"],
        [26, "This Is How I Disappear", "The Black Parade"],
        [27, "The Sharpest Lives", "The Black Parade"],
        [28, "Welcome to the Black Parade", "The Black Parade"],
        [29, "I Don't Love You", "The Black Parade"],
        [30, "House of Wolves", "The Black Parade"],
        [31, "Cancer", "The Black Parade"],
        [32, "Mama", "The Black Parade"],
        [33, "Sleep", "The Black Parade"],
        [34, "Teenagers", "The Black Parade"],
        [35, "Disenchanted", "The Black Parade"],
        [36, "Famous Last Words", "The Black Parade"],
        [37, "Blood", "The Black Parade"],
        [38, "Look Alive, Sunshine", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [39, "Na Na Na (Na Na Na Na Na Na Na Na Na)", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [40, "Bulletproof Heart", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [41, "SING", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [42, "Planetary (GO!)", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [43, "The Only Hope for Me Is You", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [44, "Jet-Star and the Kobra Kid", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [45, "Party Poison", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [46, "Save Yourself, I'll Hold Them Back", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [47, "S/C/A/R/E/C/R/O/W", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [48, "Summertime", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [49, "DESTROYA", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [50, "The Kids from Yesterday", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [51, "Goodnite, Dr. Death", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [52, "Vampire Money", "Danger Days: The True Lives of the Fabulous Killjoys"],
        [53, "Boy Division", "Conventional Weapons"],
        [54, "Tomorrow's Money", "Conventional Weapons"],
        [55, "AMBULANCE", "Conventional Weapons"],
        [56, "Gun.", "Conventional Weapons"],
        [57, "The World Is Ugly", "Conventional Weapons"],
        [58, "The Light Behind Your Eyes", "Conventional Weapons"],
        [59, "Kiss the Ring", "Conventional Weapons"],
        [60, "Make Room!!!!", "Conventional Weapons"],
        [61, "Surrender the Night", "Conventional Weapons"],
        [62, "Burn Bright", "Conventional Weapons"]
    ];
    
    var find_counts = async () => {
        var counts = await (await fetch(counts_url)).json();
        
        return counts;
    };
    
    const counts = await find_counts();
    
    const likes = counts[0].map((_, i) => counts.reduce((u, s) => u + (s[i] > 0 ? s[i] : 0), 0));
    
    var you_like = [];
    
    var update_suggestions;
    
    var divify = (song, quality = null) => {
        var div = document.createElement("div");
            
        var b = document.createElement("b");

        b.textContent = song[1];

        var p = document.createElement("p");

        p.textContent = song[2];
        
        if (quality != null) {
            var q = document.createElement("p");
            
            q.className = "quality";
            q.textContent = ((quality / 2) * 100).toFixed(2) + "%";
            
            q.style.color = "hsl(120, 100%, " + (40 - quality * 7.5) + "%)";
            
            div.appendChild(q);
        }

        div.appendChild(b);
        div.appendChild(p);

        div.onclick = () => {
            you_like.push(song[0]);

            div.parentNode.removeChild(div);
            
            if (div.querySelector(".quality"))
                div.removeChild(div.querySelector(".quality"));

            known.appendChild(div);

            div.onclick = () => {
                you_like = you_like.filter(y => y != song[0]);

                div.parentNode.removeChild(div);

                update_suggestions();

                find_input.oninput();
            };

            update_suggestions();

            find_input.oninput();
        };

        return div;
    };
    
    update_suggestions = () => {
        while (suggestions.firstChild)
            suggestions.removeChild(suggestions.firstChild);
        
        if (!known.children.length) {
            known_no_songs.style.display = "";
            suggestions_no_songs.style.display = "";
            
            return;
        }
        
        known_no_songs.style.display = "none";
        suggestions_no_songs.style.display = "none";
        
        var worths = [...likes].fill(0);
        
        for (var count of counts) {
            var multiplier = you_like.reduce((m, i) => m + Math.max(count[i], 0) / likes[i], 0) / you_like.length;
            
            for (var i = 0; i < count.length; i++)
                worths[i] += count[i] * multiplier;
        }
        
        var ranking = worths.map((w, i) => [w / likes[i] ** 0.875, i]).sort((s_0, s_1) => s_1[0] - s_0[0]).filter(r => !you_like.includes(r[1]));
        
        var multiplier = likes[ranking.find(r => r[0] == Math.max(...ranking.map(r => r[0])))[1]] ** 0.875;
        
        for (var song of ranking)
            song[0] *= multiplier;
        
        for (var song of ranking.filter((r, i) => i < 10 || r[0] >= 1.5))
            suggestions.appendChild(divify(songs[song[1]], song[0]));
    };
    
    find_input.oninput = () => {
        var input = find_input.value.trim();
        
        while (find_songs.firstChild)
            find_songs.removeChild(find_songs.firstChild);
        
        if (!input) {
            find_no_songs.textContent = "(start typing a song or album name to filter results)";
            find_no_songs.style.display = "";
            
            return;
        }
        
        find_no_songs.style.display = "none";
        
        var filtered = songs.filter(s => s[1].toLowerCase().includes(input.toLowerCase())).sort((s_0, s_1) => s_0[1] < s_1[1] ? -1 : 1);
        
        if (filtered.length == 0 || filtered.length == 1 && "the black parade".includes(input.toLowerCase()))
            filtered = songs.filter(s => s[2].toLowerCase().includes(input.toLowerCase()));
        
        filtered = filtered.filter(f => !you_like.includes(f[0]));
        
        if (!filtered.length) {
            find_no_songs.textContent = "(no songs or albums found)";
            find_no_songs.style.display = "";
            
            return;
        }
        
        for (var song of filtered)
            find_songs.appendChild(divify(song));
    };
    
    find_input.focus();
};
