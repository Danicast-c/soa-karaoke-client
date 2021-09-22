<template>
<b-container>
    <v-data-table striped hover dark :items="lines" :headers="fields">
        <template v-slot:item.text="{ value, item}">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.text"  :rules="[() => !!edit_line.text || 'This field is required']"/>
        </template>

        <template v-slot:item.start_s="{ value, item}">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.start_s" :rules="[() => !!validateMmSsMs(edit_line.start_s) || 'Format should be: MM:ss.mmm' ]" />
        </template>

        <template v-slot:item.end_s="{ value, item}">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.end_s" :rules="[() => validateMmSsMs(edit_line.end_s)]" />
        </template>

        <template v-slot:item.actions="{item, item: { index } }">
            <v-btn-toggle>
                <v-btn variant="primary" @click="onEdit(index)">
                    <!-- {{edit==index? "save":"edit"}} -->
                    <v-icon v-if="edit === index">mdi-star</v-icon>
                    <v-icon v-else >mdi-pencil</v-icon>
                </v-btn>
                <v-btn variant="danger" @click="deleteTableRow(item)">
                    <v-icon >mdi-delete</v-icon>
                </v-btn>
            </v-btn-toggle>
        </template>

    </v-data-table>
    <v-btn variant="success" @click="addLine()"> Add line </v-btn>
</b-container>
</template>

<script>
export default {
    data() {
        return {
            edit: null,
            edit_line: {
                start: 5055,
                end: 5555,
                end_s: "00:00.000",
                start_s: "00:00.000",
                text: "",
            },
            fields: [{
                    value: "start_s",
                    text: "Start time",
                    sortable: true,
                    class: "col-3",
                },
                {
                    value: "end_s",
                    text: "End time",
                    sortable: true,
                    class: "col-3",
                },
                {
                    value: "text",
                    text: "Line",
                    sortable: false,
                    class: "col-4",
                },
                {
                    value: "actions",
                    text: "Actions",
                    sortable: false,
                    class: "col-2",
                },
            ],
        };
    },
    created: function () {
        this.lines.forEach(element => element["start_s"] = this.intToTimeString(element.start));
        this.lines.forEach(element => element["end_s"] = this.intToTimeString(element.end));
    },
    //props: ["submitForm", "buttonText", "hasName"]
    props: {
        lines: Array,
    },
    computed: {
        rows() {
            return this.employees.length;
        },
        nameState() {
            return false;
        },
    },
    methods: {
        onEdit(index) {
            if (this.edit == index && (this.validateMmSsMs(this.edit_line.start_s)) && (this.validateMmSsMs(this.edit_line.end_s))) {
                //guardar
                console.log('tag', '');
                var current_line = this.lines.filter((item) => item.index == index)[0];
                current_line.start_s = this.edit_line.start_s;
                current_line.start = this.timeStringToInt(this.edit_line.start_s);
                current_line.end_s = this.edit_line.end_s;
                current_line.end = this.timeStringToInt(this.edit_line.end_s);
                current_line.text = this.edit_line.text;
                this.edit = null;

            } else {
                //nuevo
                var current_line = this.lines.filter((item) => item.index == index)[0];
                this.edit_line.start_s = current_line.start_s;
                this.edit_line.end_s = current_line.end_s;
                this.edit_line.text = current_line.text;
                this.edit = index;
            }

            // this.edit = this.edit !== index ? index : null;
        },
        addLine: function () {
            let new_index = Math.max(...this.lines.map(x => x['index'])) + 1;
            this.lines.push({
                start: 0,
                end: 0,
                start_s: "00:00.000",
                end_s: "00:00.000",
                text: "",
                index: new_index,
            });
            this.onEdit(new_index);
            // this.edit = new_index;
        },
        deleteTableRow: function (item) {
            // this.lines = this.lines.filter((item) => item.index != index);
            console.log('tag', item);
            var index = this.lines.indexOf(item);
            if (index > -1) {
                this.lines.splice(index, 1);
            }
        },
        timeStringToInt: function (timeString) {
            if (this.validateMmSsMs(timeString)) {
                let minutes = parseInt(timeString.substring(0, 2));
                let seconds = parseInt(timeString.substring(3, 5));
                let miliseconds = timeString.substring(6);
                miliseconds = miliseconds != "" ? parseInt(miliseconds) : 0;
                console.log('mili', miliseconds)
                return minutes * 60000 + seconds * 1000 + miliseconds;
            } else {
                return 0
            }
        },
        intToTimeString: function (timeInt) {
            if (timeInt > 0) {
                let result = 0;
                let temptime = timeInt;
                let miliseconds = temptime % 1000;
                temptime = Math.floor(temptime / 1000);
                let seconds = temptime % 60;
                temptime = Math.floor(temptime / 60);
                let minutes = Math.floor(temptime / 60);
                return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "." + miliseconds.toString().padStart(3, "0");
            } else {
                return "00:00.000"
            }
        },

        validateMmSsMs: function (value) {
            var isValid = /^([0-9][0-9])(:[0-5][0-9])(.[0-9]{1,3})?$/.test(value);
            return isValid;
        },
    },
};
</script>
