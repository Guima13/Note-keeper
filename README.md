1º          npm create vue@latest 


            # selecionar: Router + Pinia



2º          Escolher Vue e Pinia



3º          cd (note-keeper)*
            npm install
            npm run dev



4º          já dentro abro [src/App.vue] e deixo só:   <template>
                                                         <router-view />
                                                       <template>



5º          Na raiz do projeto (onde está o package.json), cria o ficheiro:          db.json(o stor dá)



6º          No package.json, em "scripts", adiciona:  ["json-server": "json-server --watch db.json --port 3000"]
            
            Depois, no terminal:  npm run json-server  (se der erro ,é a pasta que esta mal colocada [cd note-keeper
                      npm run json-server])
           


7º          Criar as 3 views base: src/views/HomeView.vue
                                   src/views/NoteDetailView.vue
                                   src/views/NoteFormView.vue



8º          Abre src/router/index.js e ajusta:



COMEÇAR EXERCICIO 2


9º          Criar o ficheiro src/api.js       (colocar o código la dentro)





COMEÇAR EXE 3              Criar o ficheiro da store



10º         Cria:  src/stores/notes.js        (colocar o código la dentro)    



COMEÇAR EXE 4            FAZER O HOMEVIEW.VUE    (colocar o código la dentro)


COMEÇAR EXE 5            FAZER O NOTEDETAILVIEW.VUE    (colocar o código la dentro)


COMEÇAR EXE 6            FAZER O NOTEFORMVIEW.VUE


COMEÇAR EXE 7            

