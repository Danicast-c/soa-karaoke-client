<template>
<v-container>
    <v-data-table striped hover dark :items="lines" :headers="fields" :items-per-page="1000" :sort-by="startTime" >
        <template v-slot:[`item.text`]="{ value, item }">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.text" :rules="[() => !!edit_line.text || 'This field is required']" />
        </template>

        <template v-slot:[`item.start_s`]="{ value, item }">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.start_s" :rules="[
            () =>
              !!validateMmSsMs(edit_line.start_s) ||
              'Format should be: MM:ss.mmm',
          ]" />
        </template>

        <template v-slot:[`item.end_s`]="{ value, item }">
            <template v-if="edit != item.index">{{ value }}</template>
            <v-text-field v-else v-model="edit_line.end_s" :rules="[() => !! validateMmSsMs(edit_line.end_s)||
              'Format should be: MM:ss.mmm',]" />
        </template>

        <template v-slot:[`item.actions`]="{ item, item: { index } }">
            <v-btn-toggle>
                <v-btn variant="primary" @click="onEdit(index)"  :disabled="edit!=null && edit!== index">
                    <!-- {{edit==index? "save":"edit"}} -->
                    <v-icon v-if="edit === index">mdi-content-save </v-icon>
                    <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
                <v-btn variant="danger" @click="deleteTableRow(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-btn-toggle>
        </template>


        
    </v-data-table>
    <v-btn variant="success" @click="addLine()" :disabled="edit!=null"> Add line </v-btn>
</v-container>
</template>

<style>

</style>

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
                    width: "15%"
                },
                {
                    value: "end_s",
                    text: "End time",
                    sortable: false,
                    width: "15%"
                },
                {
                    value: "text",
                    text: "Line",
                    sortable: false,
                    width: "60%"
                },
                {
                    value: "actions",
                    text: "Actions",
                    sortable: false,
                    width: "10%"
                },
            ],
        };
    },
    created: function () {
        this.lines.forEach(
            (element) => (element["start_s"] = this.intToTimeString(element.startTime))
        );
        this.lines.forEach(
            (element) => (element["end_s"] = this.intToTimeString(element.endTime))
        );

        this.lines.forEach((arrayItem, index, fullArray) =>
            (arrayItem["index"] = index)
        );
        this.lines.sort(function(a, b) {
            return a["startTime"] - b["startTime"] });
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
            if (this.edit == index) {
                if (this.validateMmSsMs(this.edit_line.start_s) &&
                    this.validateMmSsMs(this.edit_line.end_s) &&
                    this.edit_line.text) {
                    //guardar
                    var current_line = this.lines.filter((item) => item.index == index)[0];
                    current_line.start_s = this.edit_line.start_s;
                    current_line.startTime = this.timeStringToInt(this.edit_line.start_s);
                    current_line.end_s = this.edit_line.end_s;
                    current_line.endTime = this.timeStringToInt(this.edit_line.end_s);
                    current_line.text = this.edit_line.text;
                    this.edit = null;
                    this.lines.sort(function(a, b) {
                    return a["startTime"] - b["startTime"] });
                }
            } else {
                //nuevo
                var current_line = this.lines.filter((item) => item.index == index)[0];
                this.edit_line.start_s = current_line.start_s;
                this.edit_line.end_s = current_line.end_s;
                this.edit_line.text = current_line.text;
                this.edit = index;
                this.lines.sort(function(a, b) {
                    return a["startTime"] - b["startTime"] });
            }

            // this.edit = this.edit !== index ? index : null;
        },
        addLine: function () {
            let new_index = 0;
            let new_start_time = 0;

            if (this.lines.length > 0) {
                let last_index = Math.max(...this.lines.map((x) => x["index"]));
                new_index = last_index + 1;
                new_start_time = Math.max(...this.lines.map((x) => x["endTime"]));
            }
            let new_end_time = new_start_time + 5;
            this.lines.push({
                startTime: new_start_time,
                endTime: new_end_time,
                start_s: this.intToTimeString(new_start_time),
                end_s: this.intToTimeString(new_end_time),
                text: "",
                index: new_index,
            });
            this.onEdit(new_index);
            this.lines.sort(function(a, b) {
                    return a["startTime"] - b["startTime"] });
            // this.edit = new_index;
        },
        deleteTableRow: function (item) {
            // this.lines = this.lines.filter((item) => item.index != index);
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
                return minutes * 60 + seconds + (miliseconds / 1000);
            } else {
                return 0;
            }
        },
        intToTimeString: function (timeInt) {
            if (timeInt > 0) {
                let result = 0;
                let temptime = timeInt;
                let miliseconds = Math.floor((temptime % 1) * 1000);
                temptime = Math.floor(temptime);
                let seconds = temptime % 60;
                temptime = Math.floor(temptime / 60);
                let minutes = Math.floor(temptime % 60);
                return (
                    minutes.toString().padStart(2, "0") +
                    ":" +
                    seconds.toString().padStart(2, "0") +
                    "." +
                    miliseconds.toString().padStart(3, "0")
                );
            } else {
                return "00:00.000";
            }
        },

        validateMmSsMs: function (value) {
            var isValid = /^([0-9][0-9])(:[0-5][0-9])(.[0-9]{1,3})?$/.test(value);
            return isValid;
        },
    },
};
</script>
