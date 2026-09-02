import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

// components
import { Loading } from "partials/loading";

// providers
import { useNotification } from "providers/Notification";
import { useHorizonApiClient } from "providers/Api";

// utils
import { errorStatus, fromLocal } from "utils";

// config
import config from "../../../config";

// types
import { LoggedUserDto } from "lib";
import { SecurityFormDto } from "../types";

/**
 * Security section
 * @returns Security component
 */
function Security() {
  const { t } = useTranslation();

  const horizonApiClient = useHorizonApiClient();

  const userId = fromLocal<LoggedUserDto>(config.user, "object")?.user?.id;

  const { setNotification } = useNotification();
  const [saving, setSaving] = useState(false);

  const { handleSubmit, control } = useForm<SecurityFormDto>();

  const onSubmit = async (d: SecurityFormDto) => {
    setSaving(true);
    try {
      if (d.password !== d.rPassword) {
        setSaving(false);
        console.error(t("_accessibility:errors.passwordDoNotMatch"));
        return setNotification(t("_accessibility:errors.passwordDoNotMatch"));
      }
      const { error, status } = await horizonApiClient.User.update({ ...d, id: Number(userId) });
      setNotification(String(status));

      if (error) console.error(error);
    } catch (e) {
      console.error(e);
      setNotification(errorStatus(e));
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form pt-10">
      <h2 className="text-1xl md:text-2xl font-bold mb-5">{t("_pages:settings.links.security")}</h2>
      <div>
        <label>{t("_entities:user.password.label")}</label>
        <Controller
          control={control}
          disabled={saving}
          name="password"
          render={({ field }) => (
            <input
              {...field}
              name="password"
              id="password"
              type="password"
              placeholder={t("_entities:user.password.placeholder")}
              required
            />
          )}
        />
      </div>
      <div>
        <label>{t("_entities:user.rPassword.label")}</label>
        <Controller
          control={control}
          disabled={saving}
          name="rPassword"
          render={({ field }) => (
            <input
              {...field}
              type="password"
              name="rPassword"
              id="rPassword"
              placeholder={t("_entities:user.rPassword.placeholder")}
              required
            />
          )}
        />
      </div>

      <button type="submit" disabled={saving} className="mb-5 submit">
        {saving && (
          <Loading className="button-loading" strokeWidth="4" loaderClass="!w-6" color="stroke-white" />
        )}
        {t("_accessibility:buttons.save")}
      </button>
    </form>
  );
}

export default Security;
