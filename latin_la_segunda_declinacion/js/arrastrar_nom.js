/*
arrastrar_nom.js
Arrastrar y soltar nominativos de latin, 2a decl. 
Drag and drop latin nominative words, 2. decl.
Author: Kari Lajunen 
*/

          var correct_words_counter = 0;

          function highlightWordEndings(list)
          {

            elements = list.getElementsByTagName('LI');
            console.log("elements.length = " + elements.length);

            if (elements.length > 0)
            {
              console.log("---elements.length = " + elements.length);
              if (elements[0].innerHTML.slice(-1) == "r" && elements.length == 4)
              {
                console.log("last char = " + elements[0].innerHTML.slice(-1));
                for (var i = 0; i < elements.length; i++)
                {
                  var original = elements[i].innerHTML;
                  elements[i].innerHTML = original.slice(0, -1) + "<strong>" + original.slice(-1) + "</strong>";
                }
              }
              else if ( elements[0].innerHTML.slice(-1) == "s" && elements.length == 8 )
              {
                for (var i = 0; i < elements.length; i++)
                {
                  var original = elements[i].innerHTML;
                  elements[i].innerHTML = original.slice(0, -2) + "<strong>-" + original.slice(-2) + "</strong>";
                }
              }
              else if ( elements[0].innerHTML.slice(-1) == "i" && elements.length == 4 )
              {
                for (var i = 0; i < elements.length; i++)
                {
                  var original = elements[i].innerHTML;
                  elements[i].innerHTML = original.slice(0, -1) + "<strong>-" + original.slice(-1) + "</strong>";
                }
              }
              else if ( elements[0].innerHTML.slice(-1) == "a" && elements.length == 1 )
              {
                for (var i = 0; i < elements.length; i++)
                {
                  var original = elements[i].innerHTML;
                  elements[i].innerHTML = original.slice(0, -1) + "<strong>-" + original.slice(-1) + "</strong>";
                }
              }
              else if ( elements[0].innerHTML.slice(-1) == "m" && elements.length == 1 )
              {
                for (var i = 0; i < elements.length; i++)
                {
                  var original = elements[i].innerHTML;
                  elements[i].innerHTML = original.slice(0, -2) + "<strong>-" + original.slice(-2) + "</strong>";
                }
              }

            }

          }
        
          function allowDrop(ev)
          {
              ev.preventDefault();
              ev.dataTransfer.dropEffect = "copy";
              ev.stopPropagation();

              return false;
          }

          function dragStart(ev)
          {
              let target = event.target;
              console.log(target);

              // allow copy operations
              ev.effectAllowed = "copy";
              ev.dataTransfer.setData("text/plain", ev.target.id);
              ev.dataTransfer.setData("text/html", ev.target.textContent);
              console.log(ev.target.id + " " + ev.target.textContent);

              // Let's remove feedback alert texts
              document.getElementById('alert_correcto').innerHTML = "";
              document.getElementById('alert_cuidado').innerHTML = "";

              return true;
          }

          function drop_1(ev)
          {
              console.log("drop...");

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  var nominatives_1_ul = document.getElementById('nominatives_1');
                  var nominatives_2_ul = document.getElementById('nominatives_2');
                  var nominatives_3_ul = document.getElementById('nominatives_3');
                  var nominatives_4_ul = document.getElementById('nominatives_4');
                  var nominatives_5_ul = document.getElementById('nominatives_5');

                  console.log("data_text_content = " + data_text_content);

                  // Let's add the copy of the node (word) into the nominatives_1 list 
                  // if it is empty 
                  if ( nominatives_1_ul.getElementsByTagName('li').length == 0 ) 
                  {

                    // and if there is no similar words (endings) in other lists.
                    if ( ( nominatives_2_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_2_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) && 
                      ( nominatives_3_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_3_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&                      
                      ( nominatives_4_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_4_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&
                      (nominatives_5_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_5_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) )
                    {
                      console.log("--- if block...")

                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives_1". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_1_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Muy bien!</strong> A continuación, puedes añadir palabras que acaban como <em>" +
                       data_text_content + "</em> en la misma caja.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else
                    {
                      // Let's give feedback to the user that there is already similar words in
                      // other lists/boxes.
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> Ya hay palabras que acaban como " +
                       data_text_content + " en alguna de las cajas. Por eso ya no es posible añadirla en una nueva caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  else  
                  { // There are already items in the nominatives_ul_1 list

                    var first_word = nominatives_1_ul.firstElementChild.innerHTML;
                    console.log("first_word: " + first_word);

                    // If the last character of the first word of the list is same as
                    // the last character of this new word, we can add the new word
                    if ( first_word.slice(-1) == data_text_content.slice(-1) )
                    {
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_1_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Genial!</strong> Has añadido <em>" + data_text_content + "</em> en la caja correcta.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }

                      console.log("nominatives_1_ul.length = " + nominatives_1_ul.length);

                      // if all words are added to the list, let's highlight word endings
                    }
                    else 
                    {
                      // Let's give feedback to the user
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> No es posible añadir palabras que no acaban como otras palabras en la caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  highlightWordEndings(nominatives_1_ul);
                
                }

              }
          }


          function drop_2(ev)
          {
              console.log("drop_2...");

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  var nominatives_1_ul = document.getElementById('nominatives_1');
                  var nominatives_2_ul = document.getElementById('nominatives_2');
                  var nominatives_3_ul = document.getElementById('nominatives_3');
                  var nominatives_4_ul = document.getElementById('nominatives_4');
                  var nominatives_5_ul = document.getElementById('nominatives_5');

                  console.log("data_text_content = " + data_text_content);

                  // Let's add the copy of the node (word) into the nominatives_2 list 
                  // if it is empty 
                  if ( nominatives_2_ul.getElementsByTagName('li').length == 0 ) 
                  {

                    // and if there is no similar words (endings) in other lists.
                    if ( ( nominatives_1_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_1_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) && 
                      ( nominatives_3_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_3_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&                      
                      ( nominatives_4_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_4_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&
                      (nominatives_5_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_5_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) )
                    {
                      console.log("--- if block...")

                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives_1". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_2_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";
                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Muy bien!</strong> A continuación, puedes añadir palabras que acaban como <em>" +
                       data_text_content + "</em> en la misma caja.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }                                             
                    }
                    else
                    {
                      // Let's give feedback to the user that there is already similar words in
                      // other lists/boxes.
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> Ya hay palabras que acaban como " +
                       data_text_content + " en alguna de las cajas. Por eso ya no es posible añadirla en una nueva caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  else  
                  { // There are already items in the nominatives_ul_2 list

                    var first_word = nominatives_2_ul.firstElementChild.innerHTML;
                    console.log("first_word: " + first_word);

                    // If the last character of the first word of the list is same as
                    // the last character of this new word, we can add the new word
                    if ( first_word.slice(-1) == data_text_content.slice(-1) )
                    {
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_2_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>"; 

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Genial!</strong> Has añadido <em>" + 
                      data_text_content + "</em> en la caja correcta.";                    

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }

                    }
                    else 
                    {
                      // Let's give feedback to the user
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> No es posible añadir palabras que no acaban como otras palabras en la caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }      

                highlightWordEndings(nominatives_2_ul);

              }
          }
        
          function drop_3(ev)
          {
              console.log("drop_3...");

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  var nominatives_1_ul = document.getElementById('nominatives_1');
                  var nominatives_2_ul = document.getElementById('nominatives_2');
                  var nominatives_3_ul = document.getElementById('nominatives_3');
                  var nominatives_4_ul = document.getElementById('nominatives_4');
                  var nominatives_5_ul = document.getElementById('nominatives_5');

                  console.log("data_text_content = " + data_text_content);

                  // Let's add the copy of the node (word) into the nominatives_3 list 
                  // if it is empty 
                  if ( nominatives_3_ul.getElementsByTagName('li').length == 0 ) 
                  {

                    // and if there is no similar words (endings) in other lists.
                    if ( ( nominatives_1_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_1_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) && 
                      ( nominatives_2_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_2_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&                      
                      ( nominatives_4_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_4_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&
                      (nominatives_5_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_5_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) )
                    {
                      console.log("--- if block...")

                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives_1". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_3_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Muy bien!</strong> A continuación, puedes añadir palabras que acaban como <em>" +
                       data_text_content + "</em> en la misma caja.";                      

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else
                    {
                      // Let's give feedback to the user that there is already similar words in
                      // other lists/boxes.
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> Ya hay palabras que acaban como " +
                       data_text_content + " en alguna de las cajas. Por eso ya no es posible añadirla en una nueva caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  else  
                  { // There are already items in the nominatives_ul_3 list

                    var first_word = nominatives_3_ul.firstElementChild.innerHTML;
                    console.log("first_word: " + first_word);

                    // If the last character of the first word of the list is same as
                    // the last character of this new word, we can add the new word
                    if ( first_word.slice(-1) == data_text_content.slice(-1) )
                    {
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_3_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Genial!</strong> Has añadido <em>" + 
                      data_text_content + "</em> en la caja correcta.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else 
                    {
                      // Let's give feedback to the user
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> No es posible añadir palabras que no acaban como otras palabras en la caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  highlightWordEndings(nominatives_3_ul);

              }
          }

          function drop_4(ev)
          {
              console.log("drop_4...");

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  var nominatives_1_ul = document.getElementById('nominatives_1');
                  var nominatives_2_ul = document.getElementById('nominatives_2');
                  var nominatives_3_ul = document.getElementById('nominatives_3');
                  var nominatives_4_ul = document.getElementById('nominatives_4');
                  var nominatives_5_ul = document.getElementById('nominatives_5');

                  console.log("data_text_content = " + data_text_content);

                  // Let's add the copy of the node (word) into the nominatives_4 list 
                  // if it is empty 
                  if ( nominatives_4_ul.getElementsByTagName('li').length == 0 ) 
                  {

                    // and if there is no similar words (endings) in other lists.
                    if ( ( nominatives_1_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_1_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) && 
                      ( nominatives_2_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_2_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&                      
                      ( nominatives_3_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_3_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&
                      (nominatives_5_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_5_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) )
                    {
                      console.log("--- if block...")

                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives_1". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_4_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";
                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Muy bien!</strong> A continuación, puedes añadir palabras que acaban como <em>" +
                       data_text_content + "</em> en la misma caja.";                      

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else
                    {
                      // Let's give feedback to the user that there is already similar words in
                      // other lists/boxes.
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> Ya hay palabras que acaban como " +
                       data_text_content + " en alguna de las cajas. Por eso ya no es posible añadirla en una nueva caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  else  
                  { // There are already items in the nominatives_ul_4 list

                    var first_word = nominatives_4_ul.firstElementChild.innerHTML;
                    console.log("first_word: " + first_word);

                    // If the last character of the first word of the list is same as
                    // the last character of this new word, we can add the new word
                    if ( first_word.slice(-1) == data_text_content.slice(-1) )
                    {
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_4_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Genial!</strong> Has añadido <em>" + 
                      data_text_content + "</em> en la caja correcta.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else 
                    {
                      // Let's give feedback to the user
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> No es posible añadir palabras que no acaban como otras palabras en la caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }  
                 highlightWordEndings(nominatives_4_ul);
    
              }
          }


          function drop_5(ev)
          {
              console.log("drop_5...");

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  var nominatives_1_ul = document.getElementById('nominatives_1');
                  var nominatives_2_ul = document.getElementById('nominatives_2');
                  var nominatives_3_ul = document.getElementById('nominatives_3');
                  var nominatives_4_ul = document.getElementById('nominatives_4');
                  var nominatives_5_ul = document.getElementById('nominatives_5');

                  console.log("data_text_content = " + data_text_content);

                  // Let's add the copy of the node (word) into the nominatives_5 list 
                  // if it is empty 
                  if ( nominatives_5_ul.getElementsByTagName('li').length == 0 ) 
                  {

                    // and if there is no similar words (endings) in other lists.
                    if ( ( nominatives_1_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_1_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) && 
                      ( nominatives_2_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_2_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&                      
                      ( nominatives_3_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_3_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) &&
                      (nominatives_4_ul.getElementsByTagName('li').length == 0 || 
                      nominatives_4_ul.firstElementChild.innerHTML.slice(-1) != 
                      data_text_content.slice(-1) ) )
                    {
                      console.log("--- if block...")

                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives_1". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_5_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Muy bien!</strong> A continuación, puedes añadir palabras que acaban como <em>" +
                       data_text_content + "</em> en la misma caja.";                      

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else
                    {
                      // Let's give feedback to the user that there is already similar words in
                      // other lists/boxes.
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> Ya hay palabras que acaban como " +
                       data_text_content + " en alguna de las cajas. Por eso ya no es posible añadirla en una nueva caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  else  
                  { // There are already items in the nominatives_ul_5 list

                    var first_word = nominatives_5_ul.firstElementChild.innerHTML;
                    console.log("first_word: " + first_word);

                    // If the last character of the first word of the list is same as
                    // the last character of this new word, we can add the new word
                    if ( first_word.slice(-1) == data_text_content.slice(-1) )
                    {
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      nominatives_5_ul.appendChild(li_node);

                      // Let's change the original word to non-draggable and show it as a "deleted" text.
                      original_node.setAttribute("draggable", "false");
                      original_node.innerHTML = "<del>" + data_text_content + "</del>";

                      element_alert_correcto = document.getElementById('alert_correcto');
                      element_alert_correcto.innerHTML = "<strong>¡Genial!</strong> Has añadido <em>" + 
                      data_text_content + "</em> en la caja correcta.";

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }
                    }
                    else 
                    {
                      // Let's give feedback to the user
                      element_alert_cuidado = document.getElementById('alert_cuidado');
                      element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> No es posible añadir palabras que no acaban como otras palabras en la caja.";

                      if ( !$("#alert_correcto").hasClass('hidden') )
                      {
                        $("#alert_correcto").addClass('hidden');
                      }

                      if ( $(element_alert_cuidado).hasClass('hidden') )
                      {
                        $(element_alert_cuidado).removeClass('hidden');
                      }
                    }

                  }
                  highlightWordEndings(nominatives_5_ul);
      
              }
          }

          // stop propagation and prevent default drag behavior
          // to show that our target lists are valid drop targets
          function dragEnter(ev) 
          {
              const target = ev.target;
              if ( target ) 
              {
                  ev.stopPropagation();
                  ev.preventDefault();
                  //target.style.background = '#ADD8E6';
                  //target.style.border-color = black;
              }

              return false;
          }

          function dragLeave(ev) 
          {
              //ev.target.style.background = '';
              //target.style.border-color = '';
              return false;
          }

        
