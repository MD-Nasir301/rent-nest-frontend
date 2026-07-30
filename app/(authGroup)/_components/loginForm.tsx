import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@base-ui/react/input";

const LoginForm = () => {
  return (
    <div>
      <form className="space-y-4">
        <Card className="p-5 space-y-4">
          <Input
            className="p-3 rounded-lg"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <Input
            className="p-3 rounded-lg"
            name="password"
            type="password"
            placeholder="Enter Your Password"
            required
          />
          <Button type="submit">Login</Button>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
