/*
arrastrar.js
Arrastrar y soltar palabras de latin, 2a decl. 
Drag and drop latin words, 2. decl.
Author: Kari Lajunen 
*/

          var correct_words_counter = 0;
        
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
              document.getElementById('alert_casi_correcto').innerHTML = "";
              document.getElementById('alert_cuidado').innerHTML = "";

              return true;
          }

          /* E.g. gram_case_short = 'nom', gram_case_class = 'nominative_class', 
          gram_case_spanish = 'nominativo', gram_list_id = 'nominatives' */
          function drop(ev, gram_case_short, gram_case_class, gram_case_spanish, gram_case_list_id)
          {
              console.log("Params: " + gram_case_short + ", " + gram_case_class, + ", " + gram_case_spanish, + ", " +
                gram_case_list_id);

              const target_x = ev.target;
              if ( target_x ) 
              {
                  ev.preventDefault();
                  var data = ev.dataTransfer.getData("text/plain");
                  var data_text_content = ev.dataTransfer.getData("text/html");
                  var original_node = document.getElementById(data);

                  console.log("data_text_content = " + data_text_content);

                  console.log("drop_nom just before if block...")
                  console.log(data);

                  if ( data_text_content.includes(".") || data_text_content.includes("!") || 
                  	data_text_content.includes(","))
                  {
                    // Let's remove the last character: "."
                    data_text_content = data_text_content.slice(0, -1);
                  }

                  // Let's add the copy of the node (word) into the box if it is 
                  // e.g. nominativo (nom) and it is not added already, that is, it does not 
                  // have case class e.g. 'nominative_class'.
                  if ( data.includes(gram_case_short) && data.includes("2a_decl") && 
                    !$(original_node).hasClass(gram_case_class) ) 
                  {
                      console.log("--- if block...")
                      // Let's change the backroundcolor of the original node/word
                      // and add a tooltip
                      original_node.setAttribute("data-toggle", "tooltip");
                      original_node.setAttribute("title", data_text_content + " | " + gram_case_spanish);
                      original_node.setAttribute("data-placement", "top");
                      original_node.setAttribute("class", gram_case_class);
                      $(document).ready(function(){
                          $('[data-toggle="tooltip"]').tooltip(); 
                      });

                      //ev.target.appendChild(document.getElementById(data));    


                      // Instead of dropping the original node, let's add only the 
                      // text content by creating a new list item to our unordered 
                      // list called e.g. "nominatives". 
                      var li_node = document.createElement("LI");  
                      var textnode = document.createTextNode(data_text_content);
                      li_node.appendChild(textnode);
                      // Let's add the created new li_node to the ul list which id is e.g. "nominatives".
                      document.getElementById(gram_case_list_id).appendChild(li_node);
                      // Let's give feedback to the user by increasing correct words count.                   
                      document.getElementById('correct_words_count').innerHTML = ++correct_words_counter;
                      // Let's show feedback to the user that it was correct!
                      element_alert_correcto = document.getElementById('alert_correcto');

                      if ( correct_words_counter % 2 == 0 )
                      {
                        element_alert_correcto.innerHTML = "<strong>¡Correcto!</strong> ¡Genial!";
                      }
                      else 
                      {
                        element_alert_correcto.innerHTML = "<strong>¡Correcto!</strong> ¡Perfecto!";
                      }

                      if ( correct_words_counter == 28 )
                      {
                        element_alert_correcto.innerHTML = "<strong>¡Enhorabuena!</strong> ¡Has conseguido encontrar todas las palabras!";
                      }


                      if ( !$("#alert_casi_correcto").hasClass('hidden') )
                      {
                        $("#alert_casi_correcto").addClass('hidden');
                      }

                      if ( !$("#alert_cuidado").hasClass('hidden') )
                      {
                        $("#alert_cuidado").addClass('hidden');
                      }

                      if ( $(element_alert_correcto).hasClass('hidden') )
                      {
                        $(element_alert_correcto).removeClass('hidden');
                      }

                  }
                  else if ( data.includes(gram_case_short) && data.includes("1a_decl") ) 
                  {
                    element_alert_casi_correcto = document.getElementById('alert_casi_correcto');
                    element_alert_casi_correcto.innerHTML = "<strong>¡Muy bien!</strong> Has sabido que " + data_text_content +
                    " es " + gram_case_spanish + ". Sin embargo, es de la primera declinación y por eso no lo hemos añadido en la caja."

                    if ( !$("#alert_correcto").hasClass('hidden') )
                    {
                      $("#alert_correcto").addClass('hidden');
                    }

                    if ( !$("#alert_cuidado").hasClass('hidden') )
                    {
                      $("#alert_cuidado").addClass('hidden');
                    }

                    if ( $(element_alert_casi_correcto).hasClass('hidden') )
                    {
                      $(element_alert_casi_correcto).removeClass('hidden');
                    }
                    
                  }
                  else if ( data.includes(gram_case_short) && data.includes("3a_decl") ) 
                  {
                    element_alert_casi_correcto = document.getElementById('alert_casi_correcto');
                    element_alert_casi_correcto.innerHTML = "<strong>¡Muy bien!</strong> Has sabido que " + data_text_content +
                    " es " + gram_case_spanish + ". Sin embargo, es de la tercera declinación y por eso no lo hemos añadido en la caja."

                    if ( !$("#alert_correcto").hasClass('hidden') )
                    {
                      $("#alert_correcto").addClass('hidden');
                    }

                    if ( !$("#alert_cuidado").hasClass('hidden') )
                    {
                      $("#alert_cuidado").addClass('hidden');
                    }

                    if ( $(element_alert_casi_correcto).hasClass('hidden') )
                    {
                      $(element_alert_casi_correcto).removeClass('hidden');
                    }
                    
                  }
                  else if ( data.includes("ver") )
                  {
                    element_alert_cuidado = document.getElementById('alert_cuidado');
                    element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> La palabra " + data_text_content +
                    " es un verbo."

                    if ( !$("#alert_correcto").hasClass('hidden') )
                    {
                      $("#alert_correcto").addClass('hidden');
                    }

                    if ( !$("#alert_casi_correcto").hasClass('hidden') )
                    {
                      $("#alert_casi_correcto").addClass('hidden');
                    }

                    if ( $(element_alert_cuidado).hasClass('hidden') )
                    {
                      $(element_alert_cuidado).removeClass('hidden');
                    }

                  }
                  else 
                  {                    
                    element_alert_cuidado = document.getElementById('alert_cuidado');
                    element_alert_cuidado.innerHTML = "<strong>¡Cuidado!</strong> La palabra " + data_text_content +
                    " no es " + gram_case_spanish + "." 

                    if ( !$("#alert_correcto").hasClass('hidden') )
                    {
                      $("#alert_correcto").addClass('hidden');
                    }

                    if ( !$("#alert_casi_correcto").hasClass('hidden') )
                    {
                      $("#alert_casi_correcto").addClass('hidden');
                    }

                    if ( $(element_alert_cuidado).hasClass('hidden') )
                    {
                      $(element_alert_cuidado).removeClass('hidden');
                    }
                  }


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

        
