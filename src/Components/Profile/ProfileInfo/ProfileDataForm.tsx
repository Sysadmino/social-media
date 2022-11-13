import { Input, Textarea } from "../../Common/FormsControls/FormsControls";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactType, ProfileType } from "../../../types/types";

interface IProfileDataFormProps {
  saveProfileCallback: (values: ProfileType) => void;
}

interface FormValues {
  contacts: ContactType;
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: any;
  userId: any;
}

const ProfileDataForm: React.FC<IProfileDataFormProps> = (props) => {
  const { saveProfileCallback } = props;
  const { register, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    saveProfileCallback(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Full name:</b>
        <Input
          type="text"
          placeholder="Full name"
          name={{ ...register("fullName") }}
        />
      </div>
      <div>
        <b>About me:</b>
        <Textarea
          type="text"
          placeholder="About me"
          name={{ ...register("aboutMe") }}
        />
      </div>
      <div>
        <b>Looking for a job:</b>
        <Input type="checkbox" name={{ ...register("lookingForAJob") }} />
      </div>
      <div>
        <b>My professional skills:</b>
        <Textarea
          type="text"
          placeholder="My professional skills"
          name={{
            ...register("lookingForAJobDescription"),
          }}
        />
      </div>
      <div>
        <b>Contacts</b>
        {/*TODO: Сейчас происходит дублирование полей соц сетей. Найти решение данной проблемы*/}

        {/* {Object.keys(profile.contacts).map((x) => {
          return (
            <div key={x}>
              <b>
                {x}:{" "}
                <Input
                  type="text"
                  name={{
                    ...register(x),
                  }}
                  // name={`${x}`}
                  placeholder={x}
                />
              </b>
            </div>
          );
        })} */}

        <div>
          <b>
            vk:{" "}
            <Input
              type="text"
              placeholder="vk"
              name={{ ...register("contacts.vk") }}
            />
          </b>
        </div>
        <div>
          <b>
            facebook:{" "}
            <Input
              type="text"
              placeholder="facebook"
              name={{ ...register("contacts.facebook") }}
            />
          </b>
        </div>
        <div>
          <b>
            website:{" "}
            <Input
              type="text"
              placeholder="website"
              name={{ ...register("contacts.website") }}
            />
          </b>
        </div>
        <div>
          <b>
            twitter:{" "}
            <Input
              type="text"
              placeholder="twitter"
              name={{ ...register("contacts.twitter") }}
            />
          </b>
        </div>
        <div>
          <b>
            instagram:{" "}
            <Input
              type="text"
              placeholder="instagram"
              name={{ ...register("contacts.instagram") }}
            />
          </b>
        </div>
        <div>
          <b>
            youtube:{" "}
            <Input
              type="text"
              placeholder="youtube"
              name={{ ...register("contacts.youtube") }}
            />
          </b>
        </div>
        <div>
          <b>
            github:{" "}
            <Input
              type="text"
              placeholder="github"
              name={{ ...register("contacts.github") }}
            />
          </b>
        </div>
        <div>
          <b>
            mainLink:{" "}
            <Input
              type="text"
              placeholder="mainLink"
              name={{ ...register("contacts.mainLink") }}
            />
          </b>
        </div>
      </div>
      <button>save</button>
    </form>
  );
};

export default ProfileDataForm;

// import { reduxForm, Field } from "redux-form";
// import { Input, Textarea } from "../../Common/FormsControls/FormsControls";

// const ProfileDataForm = (props) => {
//   const { handleSubmit } = props;
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <b>Full name:</b>
//         <Field name="fullName" placeholder="Full name" component={Input} />
//       </div>
//       <div>
//         <b>About me:</b>
//         <Field name="aboutMe" placeholder="About me" component={Textarea} />
//       </div>
//       <div>
//         <b>Looking for a job:</b>
//         <Field name="lookingForAJob" component={Input} type="checkbox" />
//       </div>
//       <div>
//         <b>My professional skills:</b>
//         <Field
//           name="lookingForAJobDescription"
//           placeholder="My professional skills"
//           component={Textarea}
//         />
//       </div>
//       <div>
//         <b>Contacts</b>
//         {Object.keys(props.profile.contacts).map((x) => {
//           return (
//             <div key={x}>
//               <b>
//                 {x}:{" "}
//                 <Field
//                   name={`contacts.${x}`}
//                   placeholder={x}
//                   component={Input}
//                 />
//               </b>
//             </div>
//           );
//         })}
//       </div>
//       <button>save</button>
//     </form>
//   );
// };

// const ProfileDataReduxForm = reduxForm({
//   form: "EditProfileForm",
// })(ProfileDataForm);

// export default ProfileDataReduxForm;
