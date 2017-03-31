import {Injectable} from "@angular/core";
import {MyDance} from "../mydance";

@Injectable()
export class DynamicTemplateBuilder {

    public prepareTemplate(entity: any, useTextarea: boolean) {

        console.log(location);
        
        let editorName = "list-component";
        let id = location.search.split('?')[1];
        if (id&&id.length > 0) {
            console.log(id);
            MyDance.id = id;
            editorName = "user-component";
        }
        let template = `<${editorName}></${editorName}>`;

        return template;
    }
}