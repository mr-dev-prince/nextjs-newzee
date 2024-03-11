"use client";

// import Cookies from "js-cookie";
import Image from "next/image";
import userIcon from "@/assets/user.png";
import { AlertDialog, Button, Flex, TextField } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/user.context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import { FaPen } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const UserProfile = () => {
  const { user } = useContext(userContext);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updateDetails, setUpdateDetails] = useState("");
  const [userData, setUserData] = useState("");

  const userCollectionRef = doc(db, "users", user?.uid);

  const handleChange = (e) => {
    setUpdateDetails({ ...updateDetails, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await setDoc(userCollectionRef, {
        name: updateDetails.name,
        phone: updateDetails.phone,
        city: updateDetails.city,
        state: updateDetails.state,
        country: updateDetails.country,
        uid: user?.uid,
      });
      setUpdateProfile(false);
      window.location.reload();
    } catch (error) {
      console.error("Error while updating user details !", error);
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await getDoc(userCollectionRef);
        setUserData(userDetails?.data());
      } catch (error) {
        console.log("Error while fetching user !", error);
      }
    };
    getUserDetails();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.reload();
    } catch (error) {
      console.error("Error while logging out!");
    }
  };

  const email = user?.email,
    name = userData?.name,
    city = userData?.city,
    state = userData?.state,
    country = userData?.country,
    phone = userData?.phone;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <div className="cursor-pointer">
          <Image src={userIcon} width={"28"} height={"28"} alt="" />
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>Your Profile</AlertDialog.Title>
        <div className="flex flex-col gap-5 mt-6">
          <div className="flex gap-10">
            <div>
              <p className="h-16 w-16 outline outline-2 text-3xl font-extrabold rounded-full flex justify-center items-center ">
                {email.charAt(0).toUpperCase()}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-1 pl-5">
                <p className="text-xl font-bold">
                  {name
                    ? name
                    : `User_${Math.round(Math.random(Date.now()) * 1000)}`}
                </p>
                <p className=" font-medium tracking-wider text-slate-600">
                  {state ? state : <p>not available</p>}
                </p>
              </div>
              <Button
                color={updateProfile ? "red" : "green"}
                onClick={() => setUpdateProfile(!updateProfile)}
              >
                {updateProfile ? <RxCross2 /> : <FaPen />}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-6">
              <p className="font-medium text-slate-500 w-24">Email</p>
              <p className="font-medium border-b-2">{email}</p>
            </div>
            <div className="flex flex-col gap-2">
              {updateProfile ? (
                <TextField.Input
                  onChange={handleChange}
                  id="name"
                  className=" font-medium capitalize"
                  placeholder="Name..."
                />
              ) : null}
              {updateProfile ? (
                <TextField.Input
                  onChange={handleChange}
                  id="city"
                  className=" font-medium capitalize"
                  placeholder="City..."
                />
              ) : (
                <div className="flex gap-6">
                  <p className="font-medium text-slate-500 w-24">City</p>
                  <p className="font-medium border-b-2">
                    {city ? (
                      city
                    ) : (
                      <p className="text-slate-300 font-light">not available</p>
                    )}
                  </p>
                </div>
              )}
              {updateProfile ? (
                <TextField.Input
                  onChange={handleChange}
                  className=" font-medium capitalize"
                  placeholder="State..."
                  id="state"
                />
              ) : (
                <div className="flex gap-6">
                  <p className="font-medium text-slate-500  w-24">State</p>
                  <p className="font-medium border-b-2">
                    {state ? (
                      state
                    ) : (
                      <p className="text-slate-300 font-light">not available</p>
                    )}
                  </p>
                </div>
              )}
              {updateProfile ? (
                <TextField.Input
                  onChange={handleChange}
                  className=" font-medium capitalize"
                  placeholder="Country..."
                  id="country"
                />
              ) : (
                <div className="flex gap-6">
                  <p className="font-medium text-slate-500 w-24">Country</p>
                  <p className="font-medium border-b-2">
                    {country ? (
                      country
                    ) : (
                      <p className="text-slate-300 font-light">not available</p>
                    )}
                  </p>
                </div>
              )}
              {updateProfile ? (
                <TextField.Input
                  onChange={handleChange}
                  type="tel"
                  className=" font-medium"
                  placeholder="Phone... "
                  id="phone"
                />
              ) : (
                <div className="flex gap-6">
                  <p className="font-medium text-slate-500 w-24">Phone No</p>
                  <p className="font-medium border-b-2">
                    {phone ? (
                      phone
                    ) : (
                      <p className="text-slate-300 font-light">not available</p>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          {updateProfile ? (
            <Button color="green" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button color="red" onClick={handleLogout}>
              Log Out
            </Button>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default UserProfile;
