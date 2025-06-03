import assert from 'assert';
import axios from "axios";

describe('Array', function () {
    describe('#indexOf()', function () {
        it('POST item', function (done) {

            

            axios.post('http://127.0.0.1/item', {
                text: "MY_ITEM"
            })
                .then(function (response) {
                    let result = "item Created."
                    if(response.data === result){
                        done()
                    }
                    else{
                        done(new Error())
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            assert.equal([1, 2, 3].indexOf(4), -1);

        });
    });
});