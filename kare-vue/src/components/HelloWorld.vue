<template>
<div class="container bg__gray--l40">
    <section>
        <h1>Abas</h1>
        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="First" active>
                    <p>I'm the first tab</p>
                </b-tab>
                <b-tab title="Second">
                    <p>I'm the second tab</p>
                </b-tab>
                <b-tab title="Disabled" disabled>
                    <p>I'm a disabled tab!</p>
                </b-tab>
            </b-tabs>
        </div>
        <div>
            <b-tabs content-class="mt-3" vertical>
                <b-tab title="First" active>
                    <p>I'm the first tab</p>
                </b-tab>
                <b-tab title="Second">
                    <p>I'm the second tab</p>
                </b-tab>
                <b-tab title="Disabled" disabled>
                    <p>I'm a disabled tab!</p>
                </b-tab>
            </b-tabs>
        </div>
    </section>
    <section>
        <h1>Alerta</h1>
        <div>
            <b-alert show variant="success">Success Alert</b-alert>
            <b-alert show variant="danger">Danger Alert</b-alert>
            <b-alert show variant="warning">Warning Alert</b-alert>
            <b-alert show variant="info">Info Alert</b-alert>
        </div>
        <div>
            <b-alert show variant="success" class="alert-icon">Success Alert</b-alert>
            <b-alert show variant="danger" class="alert-icon">Danger Alert</b-alert>
            <b-alert show variant="warning" class="alert-icon">Warning Alert</b-alert>
            <b-alert show variant="info" class="alert-icon">Info Alert</b-alert>
        </div>
    </section>
    <section>
        <h1>Badge</h1>
        <div>
            <b-badge variant="primary">Primary</b-badge>
            <b-badge variant="secondary">Secondary</b-badge>
            <b-badge variant="success">Success</b-badge>
            <b-badge variant="danger">Danger</b-badge>
            <b-badge variant="warning">Warning</b-badge>
            <b-badge variant="info">Info</b-badge>
            <b-badge variant="light">Light</b-badge>
            <b-badge variant="dark">Dark</b-badge>
        </div>
        <div>
            <b-badge pill variant="primary">Primary</b-badge>
            <b-badge pill variant="secondary">Secondary</b-badge>
            <b-badge pill variant="success">Success</b-badge>
            <b-badge pill variant="danger">Danger</b-badge>
            <b-badge pill variant="warning">Warning</b-badge>
            <b-badge pill variant="info">Info</b-badge>
            <b-badge pill variant="light">Light</b-badge>
            <b-badge pill variant="dark">Dark</b-badge>
        </div>
    </section>
    <section>
        <h1>Barra de progresso</h1>
        <div>
            <b-progress :value="value" :max="max" show-progress animated></b-progress>
            <b-progress class="mt-2" :max="max" show-value>
                <b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>
                <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>
                <b-progress-bar :value="value * (1.5 / 10)" variant="danger"></b-progress-bar>
            </b-progress>

            <b-button class="mt-3" @click="randomValue">Click me</b-button>
        </div>
    </section>
    <section>
        <h1>Botão</h1>
        <div>
            <b-button variant="primary">Primary</b-button>
            <b-button variant="secondary">Secondary</b-button>
            <b-button variant="success">Success</b-button>
            <b-button variant="danger">Danger</b-button>
            <b-button variant="warning">Warning</b-button>
            <b-button variant="info">Info</b-button>
        </div>

        <div>
            <b-button variant="link">Link</b-button>
        </div>
        <div>
            <b-button block variant="primary">Block Level Button</b-button>
        </div>
    </section>
    <section>
        <h1>Breadcrumb</h1>
        <b-breadcrumb>
            <b-breadcrumb-item href="#home">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
            <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
            <b-breadcrumb-item active>Baz</b-breadcrumb-item>
        </b-breadcrumb>
    </section>
    <section>
        <h1>Card</h1>
        <b-card title="Card Title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top tag="article" style="max-width: 20rem;" class="mb-2">
            <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </section>
    <section>
        <h1>Checkbox</h1>
        <div>
            <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1" value="accepted" unchecked-value="not_accepted">I accept the terms and use</b-form-checkbox>
        </div>
        <div>
            <b-form-checkbox-group v-model="selected" :options="options" class="mb-3" value-field="item" text-field="name" disabled-field="notEnabled"></b-form-checkbox-group>
            <div class="mt-3">
                Selected:
                <strong>{{ selected }}</strong>
            </div>
        </div>
    </section>
    <section>
        <h1>Dropdown</h1>
        <div>
            <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
                <b-dropdown-item>Third Action</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item active>Active action</b-dropdown-item>
                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
        </div>
    </section>
    <section>
        <h1>Modal</h1>
        <div>
            <b-button v-b-modal.modal-1>Launch demo modal</b-button>

            <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
            </b-modal>
        </div>
    </section>
    <section>
        <h1>Paginação</h1>
        <div class="overflow-auto">
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>

            <p class="mt-3">Current Page: {{ currentPage }}</p>

            <b-table id="my-table" :items="items" :per-page="perPage" :current-page="currentPage" small></b-table>
        </div>
    </section>
    <section>
        <h1>Popover</h1>
        <div class="text-center my-3">
            <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">Hover Me</b-button>

            <b-button id="popover-target-1">Hover Me</b-button>
            <b-popover target="popover-target-1" triggers="hover" placement="top">
                <template v-slot:title>Popover Title</template>
                I am popover
                <b>component</b> content!
            </b-popover>
        </div>
    </section>
    <section>
        <h1>Radio</h1>
        <div>
            <b-form-group label="Individual radios">
                <b-form-radio v-model="selected" name="some-radios" value="A">Option A</b-form-radio>
                <b-form-radio v-model="selected" name="some-radios" value="B">Option B</b-form-radio>
            </b-form-group>

            <div class="mt-3">
                Selected:
                <strong>{{ selected }}</strong>
            </div>
        </div>
    </section>
    <section>
        <h1>Switch</h1>
        <div>
            <b-form-checkbox v-model="checked" name="check-button" switch>
                Switch Checkbox
                <b>(Checked: {{ checked }})</b>
            </b-form-checkbox>
        </div>
    </section>
</div>
</template>

<script>
export default {
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            selected: [],
            options: [{
                    item: "A",
                    name: "Option A"
                },
                {
                    item: "B",
                    name: "Option B"
                },
                {
                    item: "D",
                    name: "Option C",
                    notEnabled: true
                },
                {
                    item: {
                        d: 1
                    },
                    name: "Option D"
                },
            ],
            items: [{
                    id: 1,
                    first_name: "Fred",
                    last_name: "Flintstone",
                },
                {
                    id: 2,
                    first_name: "Wilma",
                    last_name: "Flintstone",
                },
                {
                    id: 3,
                    first_name: "Barney",
                    last_name: "Rubble",
                },
                {
                    id: 4,
                    first_name: "Betty",
                    last_name: "Rubble",
                },
                {
                    id: 5,
                    first_name: "Pebbles",
                    last_name: "Flintstone",
                },
                {
                    id: 6,
                    first_name: "Bamm Bamm",
                    last_name: "Rubble",
                },
                {
                    id: 7,
                    first_name: "The Great",
                    last_name: "Gazzoo",
                },
                {
                    id: 8,
                    first_name: "Rockhead",
                    last_name: "Slate",
                },
                {
                    id: 9,
                    first_name: "Pearl",
                    last_name: "Slaghoople",
                },
            ],
        };
    },
    computed: {
        rows() {
            return this.items.length;
        },
    },
};
</script>
