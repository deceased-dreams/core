const {
    MongoClient
} = require('mongodb');
const Chance = require('chance');
const chance = new Chance();
const fs = require('fs');
const _ = require('lodash');
const assert = require('assert');

function random_row() {
    return {
        nama: chance.name().toLowerCase(),
        umur: chance.age({
            type: 'adult'
        }),
        pendidikan: chance.pickone(['sma', 's1', 'smp', 'sd', 'tidak sekolah']),
        pekerjaan: chance.pickone(['pns', 'pensiunan', 'swasta', 'buruh', 'petani']),
        penghasilan: chance.pickone([800000, 1200000, 1600000, 3400000]),
        kt: chance.pickone(['sendiri', 'orang lain']),
        kr: chance.pickone(['sendiri', 'orang lain']),
        kkm: chance.pickone(['sendiri', 'orang lain']),
        jp: chance.natural({
            min: 2,
            max: 8
        }),
        ka: chance.pickone(['alang', 'seng', 'gewang']),
        kd: chance.pickone(['tembok', 'dinding']),
        kl: chance.pickone(['lantai', 'tanah']),
        sa: chance.pickone(['pdam', 'sumur']),
        sl: chance.pickone(['ada', 'tidak ada']),
        _class: chance.pickone([1, 0])
    }
}

async function main() {
    try {
        const mclient = new MongoClient('mongodb://localhost', {
            useNewUrlParser: true
        });
        await mclient.connect();

        const rows = mclient.db('dinastry_db').collection('rows');
        const criteria = mclient.db('dinastry_db').collection('criteria');

        const criteria_data = require('./criteria.json');
        criteria_data
            .filter(c => c.kind == 'categorial')
            .forEach(c => {
                const copts = c.options;
                const uniq_copts = _.uniqBy(copts, o => o.value);

                if (copts.length != uniq_copts.length) {
                    console.log(copts);
                    console.log(copts.length);
                    console.log(uniq_copts.length);
                    mclient.close();
                    throw new Error(`non unique options of categorial`);
                }
            });
        const items = _.range(1000).map(i => random_row());
        // fs.writeFileSync('rows.json', JSON.stringify(items));

        await rows.deleteMany({});
        await criteria.deleteMany({});

        const result_items = await rows.insertMany(items);
        const result_criteria = await criteria.insertMany(require('./criteria.json'));

        console.log('done');
    } catch (err) {
        console.log(err);
    }
}

main();