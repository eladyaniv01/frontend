import Interface from "./Interface";

const FormBuilderable = new Interface("setFields", "setSubmit");

export class FormBuilder {
    constructor(h) {
        this.h = h;
        this.fields = [];
        FormBuilderable.implementedBy(this);
    }

    formButton(child, text) {
        return this.h(
            "div",
            {
                class: "field"
            },
            [
                this.h(
                    "div",
                    {
                        class: "control"
                    },
                    [child]
                )
            ]
        );
    }

    formInput(child, f = {}) {
        return this.h(
            "div",

            [

                this.h("q-input", {
                    attrs: {
                        "label": f.name
                    },



                })

            ]
        );
    }

    setFields(fields) {
        this.fields.push(
            fields.map(f => {
                return this.formInput(
                    // this.h('div', [f.name]),
                    this.h("q-input", {
                        attrs: {
                            "class": "q-field__bottom row items-start q-field__bottom--animated"
                        },


                        domProps: {
                            type: f.type || "text",
                            placeholder: f.name,
                            name: f.name


                        }
                    }),
                    f
                );
            })
        );
    }
    setSubmit(text) {
        this.fields.push(
            this.formButton(
                this.h("input", {
                    class: "q-btn",
                    domProps: { type: "submit", value: text }
                }),
                { value: text }
            )
        );
    }

    getForm() {
        return this.h("form", {}, this.fields);
    }
}
export class FormDirector {
    makeUserSignInForm(builder) {
        builder.setFields([
            {
                name: "Username"
            },
            {
                name: "Password",
                type: "password"
            }
        ]);
        builder.setSubmit("Sign In");
    }
    makeUserRegisterForm(builder) {
        builder.setFields([
            {
                name: "Username"
            },
            {
                name: "Email"
            },
            {
                name: "Password",
                type: "password"
            },
            {
                name: "Confirm",
                type: "password"
            }
        ]);
        builder.setSubmit("Register");
    }

    makePaymentForm(builder) {
        builder.setFields([
            {
                name: "Credit Card",
                type: "password"
            }
        ]);
        builder.setSubmit("Submit Payment");
    }
}
