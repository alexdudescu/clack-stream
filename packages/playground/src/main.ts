import { _intro } from "@alexdudescu/clack-streams";
import { from } from "rxjs";


from([1, 2, 3]).pipe(
    _intro(value => `${value}`)
).subscribe();
